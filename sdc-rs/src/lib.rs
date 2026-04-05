use std::collections::{HashMap, HashSet};
use std::fmt;
use std::sync::{Arc, Mutex, PoisonError};
use std::time::{Duration, Instant};

use futures::StreamExt;
use reqwest::Client;
use serde::{Deserialize, Serialize};
use tokio::sync::mpsc;
use tokio_util::sync::CancellationToken;
use tracing::{debug, error, info, warn};

// ---------------------------------------------------------------------------
// Error
// ---------------------------------------------------------------------------

/// Errors produced by the DRED streaming client.
#[derive(Debug)]
pub enum DredError {
    /// HTTP-level failure (connection refused, DNS, TLS, timeout).
    Transport(reqwest::Error),
    /// Server returned a non-success status code.
    ServerStatus(reqwest::StatusCode),
    /// Failed to decode a chunk as UTF-8 or parse a JSON line.
    Protocol(String),
    /// The stream was closed by the server.
    StreamEnded,
    /// Shut down via cancellation token.
    Cancelled,
}

impl fmt::Display for DredError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::Transport(e) => write!(f, "transport error: {e}"),
            Self::ServerStatus(code) => write!(f, "server returned {code}"),
            Self::Protocol(msg) => write!(f, "protocol error: {msg}"),
            Self::StreamEnded => write!(f, "stream ended"),
            Self::Cancelled => write!(f, "cancelled"),
        }
    }
}

impl std::error::Error for DredError {
    fn source(&self) -> Option<&(dyn std::error::Error + 'static)> {
        match self {
            Self::Transport(e) => Some(e),
            _ => None,
        }
    }
}

impl From<reqwest::Error> for DredError {
    fn from(e: reqwest::Error) -> Self {
        Self::Transport(e)
    }
}

// ---------------------------------------------------------------------------
// DredMessage
// ---------------------------------------------------------------------------

/// A message from the DRED NDJSON stream.
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct DredMessage {
    #[serde(default)]
    pub mid: Option<String>,
    #[serde(default)]
    pub channel: Option<String>,
    #[serde(rename = "type", default)]
    pub msg_type: Option<String>,
    #[serde(default)]
    pub nbh: Option<String>,
    #[serde(default)]
    pub msg: Option<serde_json::Value>,
    #[serde(default)]
    pub ocid: Option<String>,
    /// Catch everything else
    #[serde(flatten)]
    pub extra: serde_json::Map<String, serde_json::Value>,
}

// ---------------------------------------------------------------------------
// Deduplicator
// ---------------------------------------------------------------------------

const DEFAULT_ROTATION_INTERVAL: Duration = Duration::from_secs(30);

/// Two-generation rotating deduplicator keyed on ocid.
///
/// Rotates every 30s (configurable): current generation becomes previous,
/// previous is dropped. This bounds memory while still catching duplicates
/// across a window of 30–60s.
///
/// Safe to share across reconnections via `Clone` (inner `Arc`).
/// Survives mutex poisoning — a panic in another thread won't brick the dedup.
#[derive(Debug, Clone)]
pub struct Deduplicator {
    inner: Arc<Mutex<DeduplicatorInner>>,
}

#[derive(Debug)]
struct DeduplicatorInner {
    current: HashSet<String>,
    previous: HashSet<String>,
    last_rotated: Instant,
    rotation_interval: Duration,
}

impl DeduplicatorInner {
    fn maybe_rotate(&mut self) {
        if self.last_rotated.elapsed() >= self.rotation_interval {
            self.previous = std::mem::take(&mut self.current);
            self.last_rotated = Instant::now();
        }
    }
}

/// Lock the mutex, recovering from poisoning.
fn lock_or_recover<T>(mutex: &Mutex<T>) -> std::sync::MutexGuard<'_, T> {
    mutex.lock().unwrap_or_else(PoisonError::into_inner)
}

impl Deduplicator {
    pub fn new() -> Self {
        Self::with_rotation_interval(DEFAULT_ROTATION_INTERVAL)
    }

    pub fn with_rotation_interval(interval: Duration) -> Self {
        Self {
            inner: Arc::new(Mutex::new(DeduplicatorInner {
                current: HashSet::new(),
                previous: HashSet::new(),
                last_rotated: Instant::now(),
                rotation_interval: interval,
            })),
        }
    }

    /// Returns `true` if this ocid is new (not a duplicate).
    pub fn check(&self, ocid: &str) -> bool {
        let mut inner = lock_or_recover(&self.inner);
        inner.maybe_rotate();
        if inner.current.contains(ocid) || inner.previous.contains(ocid) {
            return false;
        }
        inner.current.insert(ocid.to_string());
        true
    }

    /// Total entries across both generations.
    pub fn len(&self) -> usize {
        let inner = lock_or_recover(&self.inner);
        inner.current.len() + inner.previous.len()
    }

    pub fn is_empty(&self) -> bool {
        self.len() == 0
    }
}

impl Default for Deduplicator {
    fn default() -> Self {
        Self::new()
    }
}

// ---------------------------------------------------------------------------
// ID generation — lowercase Crockford Base32
// ---------------------------------------------------------------------------

const CROCKFORD_LOWER: &[char] = &[
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k',
    'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x',
    'y', 'z',
];

fn gen_client_id() -> String {
    nanoid::nanoid!(10, CROCKFORD_LOWER)
}

/// Generate a nanoid using lowercase Crockford Base32 alphabet.
pub fn gen_id(len: usize) -> String {
    nanoid::format(nanoid::rngs::default, CROCKFORD_LOWER, len)
}

// ---------------------------------------------------------------------------
// Wire types
// ---------------------------------------------------------------------------

/// Channel subscription config sent to POST /channels/listen
#[derive(Debug, Serialize)]
struct ChannelSubConfig {
    channel: String,
    options: ChannelSubOptions,
}

#[derive(Debug, Serialize, Default, Clone)]
struct ChannelSubOptions {
    #[serde(skip_serializing_if = "Option::is_none")]
    bookmark: Option<String>,
}

// ---------------------------------------------------------------------------
// DredClient
// ---------------------------------------------------------------------------

/// Shared state between the client and its listeners.
#[derive(Debug, Clone)]
struct SharedInner {
    base_url: String,
    client_id: String,
    http: Client,
    dedup: Deduplicator,
    cancel: CancellationToken,
    backoff_initial: Duration,
    backoff_max: Duration,
    channel_buf: usize,
}

/// A DRED client that connects to a server, spawns listeners for channel
/// subscriptions, and will support publishing messages.
///
/// The client owns the shared connection pool, deduplicator, and config.
/// Listeners created via `.listen()` share these resources.
///
/// # Example
/// ```no_run
/// use sdc_rs::DredClient;
///
/// # async fn run() {
/// let client = DredClient::builder("http://localhost:3029").build();
///
/// let (listener, mut rxs) = client.listen(vec!["news".into(), "discussion".into()]);
/// let mut news_rx = rxs.remove("news").unwrap();
///
/// // Spawn the listener
/// tokio::spawn(async move { listener.run().await });
///
/// // Consume messages from the news channel
/// while let Some(msg) = news_rx.recv().await {
///     println!("{:?}", msg);
/// }
/// # }
/// ```
#[derive(Debug, Clone)]
pub struct DredClient {
    inner: Arc<SharedInner>,
}

pub struct DredClientBuilder {
    base_url: String,
    client_id: Option<String>,
    dedup: Option<Deduplicator>,
    cancel: Option<CancellationToken>,
    channel_buf: usize,
    backoff_initial: Duration,
    backoff_max: Duration,
}

impl DredClientBuilder {
    fn new(base_url: impl Into<String>) -> Self {
        Self {
            base_url: base_url.into(),
            client_id: None,
            dedup: None,
            cancel: None,
            channel_buf: 256,
            backoff_initial: Duration::from_millis(500),
            backoff_max: Duration::from_secs(30),
        }
    }

    pub fn client_id(mut self, id: impl Into<String>) -> Self {
        self.client_id = Some(id.into());
        self
    }

    pub fn dedup(mut self, dedup: Deduplicator) -> Self {
        self.dedup = Some(dedup);
        self
    }

    pub fn cancellation_token(mut self, token: CancellationToken) -> Self {
        self.cancel = Some(token);
        self
    }

    pub fn channel_buffer(mut self, size: usize) -> Self {
        self.channel_buf = size;
        self
    }

    pub fn backoff(mut self, initial: Duration, max: Duration) -> Self {
        self.backoff_initial = initial;
        self.backoff_max = max;
        self
    }

    pub fn build(self) -> DredClient {
        DredClient {
            inner: Arc::new(SharedInner {
                base_url: self.base_url,
                client_id: self.client_id.unwrap_or_else(gen_client_id),
                http: Client::new(),
                dedup: self.dedup.unwrap_or_default(),
                cancel: self.cancel.unwrap_or_default(),
                backoff_initial: self.backoff_initial,
                backoff_max: self.backoff_max,
                channel_buf: self.channel_buf,
            }),
        }
    }
}

impl DredClient {
    pub fn builder(base_url: impl Into<String>) -> DredClientBuilder {
        DredClientBuilder::new(base_url)
    }

    /// Get a cancellation token that can be used to shut down all listeners.
    pub fn cancellation_token(&self) -> CancellationToken {
        self.inner.cancel.clone()
    }

    /// Get a reference to the shared deduplicator.
    pub fn dedup(&self) -> &Deduplicator {
        &self.inner.dedup
    }

    /// Create a listener for the given channels.
    ///
    /// Returns a `DredListener` (spawn it with `tokio::spawn(listener.run())`)
    /// and a `HashMap` of per-channel receivers.
    pub fn listen(
        &self,
        channels: Vec<String>,
    ) -> (DredListener, HashMap<String, mpsc::Receiver<DredMessage>>) {
        let mut senders = HashMap::new();
        let mut receivers = HashMap::new();
        for ch in &channels {
            let (tx, rx) = mpsc::channel(self.inner.channel_buf);
            senders.insert(ch.clone(), tx);
            receivers.insert(ch.clone(), rx);
        }
        let listener = DredListener {
            cancel: self.inner.cancel.child_token(),
            shared: Arc::clone(&self.inner),
            channels,
            senders,
        };
        (listener, receivers)
    }
}

// ---------------------------------------------------------------------------
// DredListener
// ---------------------------------------------------------------------------

/// A streaming listener spawned from a [`DredClient`].
///
/// Connects to the server's `/channels/listen` endpoint, deduplicates
/// messages, and routes them to per-channel `mpsc` receivers. Handles
/// reconnection with exponential backoff and heartbeat-based dead
/// connection detection.
///
/// Each listener has its own `CancellationToken` (a child of the client's).
/// Cancel the listener's token to stop just this listener; cancel the
/// client's token to stop all listeners.
pub struct DredListener {
    shared: Arc<SharedInner>,
    channels: Vec<String>,
    senders: HashMap<String, mpsc::Sender<DredMessage>>,
    cancel: CancellationToken,
}

impl DredListener {
    /// Get a cancellation token for this listener.
    /// Cancelling it stops only this listener; cancelling the client's token
    /// stops all listeners.
    pub fn cancellation_token(&self) -> CancellationToken {
        self.cancel.clone()
    }

    /// Run a single connection to the server.
    async fn connect_once(&self) -> Result<(), DredError> {
        let subs: Vec<ChannelSubConfig> = self
            .channels
            .iter()
            .map(|ch| ChannelSubConfig {
                channel: ch.clone(),
                options: ChannelSubOptions::default(),
            })
            .collect();

        info!(
            url = %self.shared.base_url,
            channels = ?self.channels,
            "connecting to /channels/listen"
        );

        let resp = self
            .shared
            .http
            .post(format!("{}/channels/listen", self.shared.base_url))
            .header("content-type", "application/json")
            .header("clientid", &self.shared.client_id)
            .json(&subs)
            .send()
            .await?;

        if !resp.status().is_success() {
            return Err(DredError::ServerStatus(resp.status()));
        }

        info!("connected, streaming messages");

        let mut stream = resp.bytes_stream();
        let mut buf = String::new();

        const HEARTBEAT_MULTIPLIER: u64 = 3;
        const DEFAULT_HEARTBEAT_TIMEOUT: Duration = Duration::from_secs(30);
        let mut heartbeat_deadline =
            tokio::time::Instant::now() + DEFAULT_HEARTBEAT_TIMEOUT;
        let mut heartbeat_interval = DEFAULT_HEARTBEAT_TIMEOUT;

        loop {
            tokio::select! {
                _ = self.cancel.cancelled() => {
                    info!("cancellation requested");
                    return Err(DredError::Cancelled);
                }
                _ = tokio::time::sleep_until(heartbeat_deadline) => {
                    warn!(
                        timeout_ms = heartbeat_interval.as_millis() * HEARTBEAT_MULTIPLIER as u128,
                        "heartbeat timeout — connection presumed dead"
                    );
                    return Err(DredError::StreamEnded);
                }
                chunk = stream.next() => {
                    let chunk = match chunk {
                        Some(Ok(c)) => c,
                        Some(Err(e)) => return Err(DredError::Transport(e)),
                        None => return Err(DredError::StreamEnded),
                    };

                    let text = String::from_utf8_lossy(&chunk);
                    buf.push_str(&text);

                    while let Some(newline_pos) = buf.find('\n') {
                        let line: String = buf.drain(..=newline_pos).collect();
                        let line = line.trim();

                        if line.is_empty() {
                            continue;
                        }

                        match serde_json::from_str::<DredMessage>(line) {
                            Ok(msg) => {
                                // Handle heartbeat protocol
                                match msg.msg_type.as_deref() {
                                    Some("heartbeat-info") => {
                                        if let Some(interval) = msg.extra.get("timerInterval")
                                            .and_then(|v| v.as_u64())
                                        {
                                            heartbeat_interval = Duration::from_millis(interval);
                                            let timeout = heartbeat_interval * HEARTBEAT_MULTIPLIER as u32;
                                            heartbeat_deadline = tokio::time::Instant::now() + timeout;
                                            info!(interval_ms = interval, "heartbeat interval configured");
                                        }
                                        continue;
                                    }
                                    Some("heartbeat") => {
                                        let timeout = heartbeat_interval * HEARTBEAT_MULTIPLIER as u32;
                                        heartbeat_deadline = tokio::time::Instant::now() + timeout;
                                        debug!("heartbeat received");
                                        continue;
                                    }
                                    _ => {}
                                }

                                // Dedup on ocid
                                if let Some(ref ocid) = msg.ocid {
                                    if !self.shared.dedup.check(ocid) {
                                        debug!(ocid, "duplicate, skipping");
                                        continue;
                                    }
                                }

                                // Route to per-channel receiver
                                if let Some(tx) = msg.channel.as_deref()
                                    .and_then(|ch| self.senders.get(ch))
                                {
                                    if tx.send(msg).await.is_err() {
                                        debug!("receiver dropped for channel");
                                    }
                                } else {
                                    debug!(
                                        channel = msg.channel.as_deref().unwrap_or("(none)"),
                                        "no receiver for channel, dropping message"
                                    );
                                }
                            }
                            Err(e) => {
                                warn!(line, "failed to parse NDJSON line: {e}");
                            }
                        }
                    }
                }
            }
        }
    }

    /// Run the listener with auto-reconnect. Loops until cancelled.
    pub async fn run(self) -> DredError {
        let mut backoff = self.shared.backoff_initial;

        loop {
            let connected_at = tokio::time::Instant::now();

            match self.connect_once().await {
                Err(DredError::Cancelled) => return DredError::Cancelled,
                Err(DredError::StreamEnded) => {
                    info!("stream ended, reconnecting");
                    backoff = self.shared.backoff_initial;
                }
                Err(e) => {
                    error!("connection error: {e}");
                    if connected_at.elapsed() > self.shared.backoff_max {
                        backoff = self.shared.backoff_initial;
                    }
                }
                Ok(()) => unreachable!(),
            }

            info!(
                backoff_ms = backoff.as_millis(),
                dedup_entries = self.shared.dedup.len(),
                "reconnecting"
            );

            tokio::select! {
                _ = self.cancel.cancelled() => return DredError::Cancelled,
                _ = tokio::time::sleep(backoff) => {}
            }

            backoff = (backoff * 2).min(self.shared.backoff_max);
        }
    }
}

// ---------------------------------------------------------------------------
// Unit tests
// ---------------------------------------------------------------------------

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn dedup_basic_new_and_duplicate() {
        let d = Deduplicator::new();
        assert!(d.check("a"), "first check should be new");
        assert!(!d.check("a"), "second check should be duplicate");
        assert!(d.check("b"), "different ocid should be new");
        assert_eq!(d.len(), 2);
    }

    #[test]
    fn dedup_rotation_drops_old_generation() {
        let d = Deduplicator::with_rotation_interval(Duration::from_millis(1));

        assert!(d.check("a"));
        assert!(d.check("b"));
        assert_eq!(d.len(), 2);

        std::thread::sleep(Duration::from_millis(5));

        assert!(!d.check("a"), "should still be in previous generation");
        assert!(d.check("c"));

        std::thread::sleep(Duration::from_millis(5));

        assert!(d.check("a"), "should be new after two rotations");
    }

    #[test]
    fn dedup_empty_and_len() {
        let d = Deduplicator::new();
        assert!(d.is_empty());
        assert_eq!(d.len(), 0);

        d.check("x");
        assert!(!d.is_empty());
        assert_eq!(d.len(), 1);
    }

    #[test]
    fn dedup_shared_across_clones() {
        let d1 = Deduplicator::new();
        let d2 = d1.clone();

        assert!(d1.check("shared"));
        assert!(!d2.check("shared"), "clone should see same state");
    }

    #[test]
    fn dedup_survives_poisoned_mutex() {
        let d = Deduplicator::new();
        let d2 = d.clone();

        let result = std::panic::catch_unwind(|| {
            let mut inner = d2.inner.lock().unwrap();
            inner.current.insert("before_panic".to_string());
            panic!("intentional poison");
        });
        assert!(result.is_err());

        assert!(!d.check("before_panic"), "should see entry from before panic");
        assert!(d.check("after_panic"), "should accept new entries after poison");
    }

    #[test]
    fn message_deserialize_full() {
        let json = r#"{"mid":"123-0","channel":"news","type":"test","nbh":"dev","msg":"hello","ocid":"abc"}"#;
        let msg: DredMessage = serde_json::from_str(json).unwrap();
        assert_eq!(msg.mid.as_deref(), Some("123-0"));
        assert_eq!(msg.channel.as_deref(), Some("news"));
        assert_eq!(msg.msg_type.as_deref(), Some("test"));
        assert_eq!(msg.nbh.as_deref(), Some("dev"));
        assert_eq!(msg.ocid.as_deref(), Some("abc"));
    }

    #[test]
    fn message_deserialize_minimal() {
        let json = r#"{"type":"heartbeat"}"#;
        let msg: DredMessage = serde_json::from_str(json).unwrap();
        assert_eq!(msg.msg_type.as_deref(), Some("heartbeat"));
        assert!(msg.mid.is_none());
        assert!(msg.channel.is_none());
        assert!(msg.ocid.is_none());
    }

    #[test]
    fn message_deserialize_extra_fields() {
        let json = r#"{"type":"test","customField":"value","nested":{"a":1}}"#;
        let msg: DredMessage = serde_json::from_str(json).unwrap();
        assert!(msg.extra.contains_key("customField"));
        assert!(msg.extra.contains_key("nested"));
    }

    #[test]
    fn message_roundtrip_serialize() {
        let json = r#"{"mid":"1-0","channel":"ch","type":"t","nbh":"n","msg":"m","ocid":"o"}"#;
        let msg: DredMessage = serde_json::from_str(json).unwrap();
        let reserialized = serde_json::to_string(&msg).unwrap();
        let msg2: DredMessage = serde_json::from_str(&reserialized).unwrap();
        assert_eq!(msg.mid, msg2.mid);
        assert_eq!(msg.ocid, msg2.ocid);
    }

    #[test]
    fn error_is_send_sync() {
        fn assert_send_sync<T: Send + Sync>() {}
        assert_send_sync::<DredError>();
    }

    #[test]
    fn dedup_is_send_sync() {
        fn assert_send_sync<T: Send + Sync>() {}
        assert_send_sync::<Deduplicator>();
    }

    #[test]
    fn message_is_send_sync() {
        fn assert_send_sync<T: Send + Sync>() {}
        assert_send_sync::<DredMessage>();
    }

    #[test]
    fn client_is_send_sync() {
        fn assert_send_sync<T: Send + Sync>() {}
        assert_send_sync::<DredClient>();
    }

    #[test]
    fn error_display() {
        assert_eq!(DredError::StreamEnded.to_string(), "stream ended");
        assert_eq!(DredError::Cancelled.to_string(), "cancelled");
        assert_eq!(
            DredError::Protocol("bad json".into()).to_string(),
            "protocol error: bad json"
        );
    }

    #[test]
    fn gen_id_uses_crockford_alphabet() {
        let id = crate::gen_id(20);
        assert_eq!(id.len(), 20);
        let valid: &str = "0123456789abcdefghjkmnpqrstvwxyz";
        for ch in id.chars() {
            assert!(
                valid.contains(ch),
                "char '{ch}' not in crockford alphabet, id: {id}"
            );
        }
    }

    #[test]
    fn gen_id_no_excluded_letters() {
        for _ in 0..100 {
            let id = crate::gen_id(16);
            for excluded in ['i', 'l', 'o', 'u'] {
                assert!(
                    !id.contains(excluded),
                    "id {id} contains excluded letter '{excluded}'"
                );
            }
        }
    }

    #[test]
    fn client_shares_dedup_across_listeners() {
        let client = DredClient::builder("http://127.0.0.1:1").build();

        // The dedup is shared — checking from the client affects all listeners
        client.dedup().check("seen-via-client");

        let (_listener, _rxs) = client.listen(vec!["ch".into()]);

        // The dedup is the same instance
        assert!(!client.dedup().check("seen-via-client"));
    }

    #[test]
    fn client_clone_shares_state() {
        let c1 = DredClient::builder("http://127.0.0.1:1").build();
        let c2 = c1.clone();

        c1.dedup().check("from-c1");
        assert!(!c2.dedup().check("from-c1"), "clone should share dedup");
    }

    #[tokio::test]
    async fn listener_cancellation_before_connect() {
        let client = DredClient::builder("http://127.0.0.1:1")
            .backoff(Duration::from_millis(10), Duration::from_millis(10))
            .build();

        let (listener, _rxs) = client.listen(vec!["x".into()]);
        let token = listener.cancellation_token();
        token.cancel();

        let err = listener.run().await;
        assert!(matches!(err, DredError::Cancelled));
    }

    #[tokio::test]
    async fn listener_stops_when_receiver_dropped() {
        let client = DredClient::builder("http://127.0.0.1:1")
            .backoff(Duration::from_millis(10), Duration::from_millis(10))
            .build();

        let (listener, rxs) = client.listen(vec!["x".into()]);
        let token = listener.cancellation_token();
        drop(rxs);

        let cancel = token.clone();
        tokio::spawn(async move {
            tokio::time::sleep(Duration::from_millis(200)).await;
            cancel.cancel();
        });

        let err = listener.run().await;
        assert!(matches!(err, DredError::Cancelled));
    }
}
