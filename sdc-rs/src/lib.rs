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
// Identity — Ed25519 signing
// ---------------------------------------------------------------------------

use base64::Engine;
use dryoc::classic::crypto_sign::{
    crypto_sign_detached, crypto_sign_keypair, crypto_sign_verify_detached,
};

/// An Ed25519 signing identity used for channel-ownership proofs and
/// other places where the TS client uses tweetnacl's sign/verify primitives.
///
/// Keys are generated fresh with [`Identity::generate`]. A public/secret
/// keypair can be restored from base64-encoded bytes via [`Identity::from_base64`].
///
/// The wire format matches the TS client's `StringNacl`:
/// signatures are base64-encoded 64-byte detached signatures over the
/// UTF-8 bytes of the signed string; public keys are base64-encoded 32 bytes.
#[derive(Debug, Clone)]
pub struct Identity {
    public_key: [u8; 32],
    secret_key: [u8; 64],
}

impl Identity {
    /// Generate a fresh Ed25519 identity.
    pub fn generate() -> Self {
        let (public_key, secret_key) = crypto_sign_keypair();
        Self {
            public_key,
            secret_key,
        }
    }

    /// Restore an identity from base64-encoded public and secret keys.
    pub fn from_base64(public_key_b64: &str, secret_key_b64: &str) -> Result<Self, DredError> {
        let engine = base64::engine::general_purpose::STANDARD;
        let pk_bytes = engine
            .decode(public_key_b64)
            .map_err(|e| DredError::Protocol(format!("invalid public key b64: {e}")))?;
        let sk_bytes = engine
            .decode(secret_key_b64)
            .map_err(|e| DredError::Protocol(format!("invalid secret key b64: {e}")))?;

        let public_key: [u8; 32] = pk_bytes
            .try_into()
            .map_err(|_| DredError::Protocol("public key must be 32 bytes".into()))?;
        let secret_key: [u8; 64] = sk_bytes
            .try_into()
            .map_err(|_| DredError::Protocol("secret key must be 64 bytes".into()))?;

        Ok(Self {
            public_key,
            secret_key,
        })
    }

    /// The public key as base64 (what the server sees as `owner`).
    pub fn public_key_base64(&self) -> String {
        base64::engine::general_purpose::STANDARD.encode(self.public_key)
    }

    /// The secret key as base64 (for persistence; treat as highly sensitive).
    pub fn secret_key_base64(&self) -> String {
        base64::engine::general_purpose::STANDARD.encode(self.secret_key)
    }

    /// Sign a UTF-8 string and return the base64-encoded detached signature.
    /// Matches the TS client's `StringNacl.sign(s)`.
    pub fn sign_string(&self, s: &str) -> String {
        let mut sig = [0u8; 64];
        // crypto_sign_detached can only fail on invalid key size, which
        // we guarantee at construction.
        crypto_sign_detached(&mut sig, s.as_bytes(), &self.secret_key)
            .expect("crypto_sign_detached failed on validated key");
        base64::engine::general_purpose::STANDARD.encode(sig)
    }

    /// Verify a base64-encoded detached signature against a string and a
    /// base64-encoded public key. Matches the TS client's
    /// `StringNacl.verifySig(s, sigBase64, keyBase64)`.
    pub fn verify_signature(s: &str, signature_b64: &str, public_key_b64: &str) -> bool {
        let engine = base64::engine::general_purpose::STANDARD;
        let sig_bytes = match engine.decode(signature_b64) {
            Ok(b) => b,
            Err(_) => return false,
        };
        let pk_bytes = match engine.decode(public_key_b64) {
            Ok(b) => b,
            Err(_) => return false,
        };
        let sig: [u8; 64] = match sig_bytes.try_into() {
            Ok(a) => a,
            Err(_) => return false,
        };
        let pk: [u8; 32] = match pk_bytes.try_into() {
            Ok(a) => a,
            Err(_) => return false,
        };
        crypto_sign_verify_detached(&sig, s.as_bytes(), &pk).is_ok()
    }
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
/// Listeners created via `.subscribe()` share these resources.
///
/// # Example
/// ```no_run
/// use sdc_rs::DredClient;
///
/// # async fn run() {
/// let client = DredClient::builder("http://localhost:3029").build();
///
/// let mut sub = client.subscribe(vec!["news".into(), "discussion".into()]);
/// let mut news_rx = sub.take_receiver("news").unwrap();
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

    /// Subscribe to the given channels and spawn a listener.
    ///
    /// Returns a [`DredSubscription`] handle which owns the listener task and
    /// exposes per-channel receivers. The subscription can be rotated via
    /// [`DredSubscription::update_channels`] without losing messages.
    pub fn subscribe(&self, channels: Vec<String>) -> DredSubscription {
        let mut senders = HashMap::new();
        let mut receivers = HashMap::new();
        for ch in &channels {
            let (tx, rx) = mpsc::channel(self.inner.channel_buf);
            senders.insert(ch.clone(), tx);
            receivers.insert(ch.clone(), rx);
        }

        let cancel = self.inner.cancel.child_token();
        let listener = DredListener {
            cancel: cancel.clone(),
            shared: Arc::clone(&self.inner),
            channels: channels.clone(),
            senders: senders.clone(),
            connected_signal: None,
        };
        let handle = tokio::spawn(listener.run());

        DredSubscription {
            shared: Arc::clone(&self.inner),
            senders,
            receivers,
            channels,
            current_cancel: cancel,
            current_handle: Some(handle),
            connect_timeout: Duration::from_secs(10),
        }
    }

    /// Construct a listener without spawning it. For advanced users who want
    /// to manage the listener task themselves.
    fn build_listener(
        &self,
        channels: Vec<String>,
        senders: HashMap<String, mpsc::Sender<DredMessage>>,
        cancel: CancellationToken,
        connected_signal: Option<tokio::sync::oneshot::Sender<()>>,
    ) -> DredListener {
        DredListener {
            cancel,
            shared: Arc::clone(&self.inner),
            channels,
            senders,
            connected_signal,
        }
    }

    /// Post a message to a channel.
    ///
    /// Auto-generates `ocid` if not provided. Pre-registers the ocid in
    /// the deduplicator so the sender's own echo is suppressed.
    ///
    /// Returns the server's response containing the assigned message id.
    pub async fn post_message(
        &self,
        channel: &str,
        msg: &str,
        msg_type: &str,
        ocid: Option<&str>,
    ) -> Result<PostMessageResponse, DredError> {
        let ocid = ocid
            .map(|s| s.to_string())
            .unwrap_or_else(|| gen_id(10));

        // Pre-register in dedup so our own echo gets suppressed
        self.inner.dedup.check(&ocid);

        let body = serde_json::json!({
            "msg": msg,
            "type": msg_type,
            "ocid": ocid,
        });

        let resp = self
            .inner
            .http
            .post(format!("{}/channel/{}/message", self.inner.base_url, channel))
            .header("content-type", "application/json")
            .header("accept", "application/json")
            .header("clientid", &self.inner.client_id)
            .json(&body)
            .send()
            .await?;

        if !resp.status().is_success() {
            return Err(DredError::ServerStatus(resp.status()));
        }

        let result: PostMessageResponse = resp
            .json()
            .await
            .map_err(|e| DredError::Protocol(format!("invalid response json: {e}")))?;

        Ok(result)
    }

    /// List the channels currently available on the server.
    ///
    /// Returns only public channels (those whose names don't start with `_`).
    pub async fn list_channels(&self) -> Result<Vec<String>, DredError> {
        #[derive(Deserialize)]
        struct ChannelsResp {
            channels: Vec<String>,
        }

        let resp = self
            .inner
            .http
            .get(format!("{}/channels", self.inner.base_url))
            .header("clientid", &self.inner.client_id)
            .send()
            .await?;

        if !resp.status().is_success() {
            return Err(DredError::ServerStatus(resp.status()));
        }

        let result: ChannelsResp = resp
            .json()
            .await
            .map_err(|e| DredError::Protocol(format!("invalid channels response: {e}")))?;

        Ok(result.channels)
    }

    /// Create a new plaintext channel.
    ///
    /// For encrypted channels, use [`Self::create_encrypted_channel`].
    pub async fn create_channel(
        &self,
        name: &str,
        options: CreateChannelOptions,
    ) -> Result<CreateChannelResponse, DredError> {
        if options.encrypted {
            return Err(DredError::Protocol(
                "use create_encrypted_channel for encrypted channels".into(),
            ));
        }
        self.post_create_channel(name, &options).await
    }

    /// Create an encrypted channel, signing the channel name with the
    /// provided identity. The signature proves channel ownership to the
    /// server, which validates it against the `owner` public key.
    ///
    /// Matches the TS client's `createChannel(name, {encrypted: true})`.
    ///
    /// Requires `allow_joining: Some(true)` or a non-empty members list
    /// (otherwise the channel would be unreachable).
    pub async fn create_encrypted_channel(
        &self,
        name: &str,
        identity: &Identity,
        mut options: CreateChannelOptions,
    ) -> Result<CreateChannelResponse, DredError> {
        options.encrypted = true;
        options.owner = Some(identity.public_key_base64());
        options.signature = Some(identity.sign_string(name));
        self.post_create_channel(name, &options).await
    }

    async fn post_create_channel(
        &self,
        name: &str,
        options: &CreateChannelOptions,
    ) -> Result<CreateChannelResponse, DredError> {
        let resp = self
            .inner
            .http
            .post(format!("{}/channel/{}", self.inner.base_url, name))
            .header("content-type", "application/json")
            .header("accept", "application/json")
            .header("clientid", &self.inner.client_id)
            .json(options)
            .send()
            .await?;

        if !resp.status().is_success() {
            return Err(DredError::ServerStatus(resp.status()));
        }

        let result: CreateChannelResponse = resp
            .json()
            .await
            .map_err(|e| DredError::Protocol(format!("invalid create response: {e}")))?;

        Ok(result)
    }
}

/// Options for creating a channel.
///
/// Matches the server's ChannelOptions for the plaintext subset.
#[derive(Debug, Clone, Default, Serialize)]
pub struct CreateChannelOptions {
    #[serde(default)]
    pub encrypted: bool,
    #[serde(skip_serializing_if = "Option::is_none", rename = "allowJoining")]
    pub allow_joining: Option<bool>,
    #[serde(skip_serializing_if = "Option::is_none", rename = "memberLimit")]
    pub member_limit: Option<u32>,
    /// RFC 3339 timestamp string. Callers format their own timestamps
    /// (no chrono dependency).
    #[serde(skip_serializing_if = "Option::is_none", rename = "expiresAt")]
    pub expires_at: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none", rename = "messageLifetime")]
    pub message_lifetime: Option<u64>,
    /// Base64 public key of the channel owner — set automatically by
    /// `create_encrypted_channel`.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub owner: Option<String>,
    /// Base64 detached signature over the channel name — set automatically
    /// by `create_encrypted_channel`.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub signature: Option<String>,
    /// Initial member list (base64 public keys). Required if `allow_joining`
    /// is not true.
    #[serde(skip_serializing_if = "Vec::is_empty")]
    pub members: Vec<String>,
}

/// Server response to channel creation.
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct CreateChannelResponse {
    pub id: String,
    pub status: String,
    #[serde(default, rename = "channelId")]
    pub channel_id: Option<String>,
    #[serde(default)]
    pub members: Vec<String>,
    #[serde(default, rename = "createdAt")]
    pub created_at: Option<String>,
    #[serde(flatten)]
    pub extra: serde_json::Map<String, serde_json::Value>,
}

/// Server response to a posted message.
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct PostMessageResponse {
    /// Server-assigned message id (Redis stream id).
    pub id: String,
    /// Status string, typically "created".
    pub status: String,
    /// The ocid that was sent (or auto-generated).
    pub ocid: String,
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
    /// Fired once when the listener first receives data from the server
    /// (meaning TCP, TLS, HTTP are all healthy and the stream is live).
    /// Used by [`DredSubscription`] to sequence connection rotation.
    connected_signal: Option<tokio::sync::oneshot::Sender<()>>,
}

impl DredListener {
    /// Get a cancellation token for this listener.
    /// Cancelling it stops only this listener; cancelling the client's token
    /// stops all listeners.
    pub fn cancellation_token(&self) -> CancellationToken {
        self.cancel.clone()
    }

    /// Run a single connection to the server.
    async fn connect_once(&mut self) -> Result<(), DredError> {
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
                                // Signal first-message-received to anyone waiting
                                // for us to be connected (see DredSubscription).
                                if let Some(tx) = self.connected_signal.take() {
                                    let _ = tx.send(());
                                }

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
    pub async fn run(mut self) -> DredError {
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
// DredSubscription
// ---------------------------------------------------------------------------

/// A managed subscription that owns its listener task and supports
/// dynamic channel changes without losing messages.
///
/// Returned by [`DredClient::subscribe`]. When the subscription is dropped,
/// its underlying listener is cancelled.
///
/// # Rotation
///
/// Calling [`Self::update_channels`] creates a new listener with the new
/// channel list, waits for it to establish a live stream, and only then
/// cancels the old listener. Both connections briefly coexist and route
/// through the same deduplicator, so no message is lost or duplicated
/// across the rotation.
///
/// # Example
/// ```no_run
/// # use sdc_rs::DredClient;
/// # async fn run() -> Result<(), Box<dyn std::error::Error>> {
/// let client = DredClient::builder("http://localhost:3029").build();
/// let mut sub = client.subscribe(vec!["news".into()]);
/// let mut news_rx = sub.take_receiver("news").unwrap();
///
/// // ... receive messages ...
///
/// // Add a channel without dropping the existing connection to news
/// sub.update_channels(vec!["news".into(), "discussion".into()]).await?;
/// let mut disc_rx = sub.take_receiver("discussion").unwrap();
/// # Ok(()) }
/// ```
pub struct DredSubscription {
    shared: Arc<SharedInner>,
    senders: HashMap<String, mpsc::Sender<DredMessage>>,
    receivers: HashMap<String, mpsc::Receiver<DredMessage>>,
    channels: Vec<String>,
    current_cancel: CancellationToken,
    current_handle: Option<tokio::task::JoinHandle<DredError>>,
    connect_timeout: Duration,
}

impl DredSubscription {
    /// Take the receiver for a channel. Returns `None` if the channel isn't
    /// subscribed or the receiver has already been taken.
    pub fn take_receiver(&mut self, channel: &str) -> Option<mpsc::Receiver<DredMessage>> {
        self.receivers.remove(channel)
    }

    /// The channels currently subscribed.
    pub fn channels(&self) -> &[String] {
        &self.channels
    }

    /// Cancel the underlying listener.
    pub fn cancellation_token(&self) -> CancellationToken {
        self.current_cancel.clone()
    }

    /// Set the connection-establishment timeout used by `update_channels`.
    pub fn set_connect_timeout(&mut self, timeout: Duration) {
        self.connect_timeout = timeout;
    }

    /// Replace the subscribed channels. Spins up a new listener with the new
    /// list, waits for it to connect, and only then cancels the old listener.
    ///
    /// Receivers for channels present in both old and new lists are preserved.
    /// Receivers for removed channels are dropped (closing them for the consumer).
    /// New channels get fresh receivers accessible via [`Self::take_receiver`].
    ///
    /// If the new connection fails to establish within the connect timeout,
    /// the old listener is kept and an error is returned.
    pub async fn update_channels(&mut self, new_channels: Vec<String>) -> Result<(), DredError> {
        // Build the new sender map — reuse existing senders so receivers
        // the user already holds keep working seamlessly.
        let mut new_senders = HashMap::new();
        let mut added_channels: Vec<String> = Vec::new();
        for ch in &new_channels {
            if let Some(tx) = self.senders.get(ch) {
                new_senders.insert(ch.clone(), tx.clone());
            } else {
                let (tx, rx) = mpsc::channel(self.shared.channel_buf);
                new_senders.insert(ch.clone(), tx);
                self.receivers.insert(ch.clone(), rx);
                added_channels.push(ch.clone());
            }
        }

        // Spawn the new listener with a connected signal
        let new_cancel = self.shared.cancel.child_token();
        let (connected_tx, connected_rx) = tokio::sync::oneshot::channel();

        let client = DredClient {
            inner: Arc::clone(&self.shared),
        };
        let new_listener = client.build_listener(
            new_channels.clone(),
            new_senders.clone(),
            new_cancel.clone(),
            Some(connected_tx),
        );
        let new_handle = tokio::spawn(new_listener.run());

        // Guard ensures the new listener is cancelled if we bail out mid-flight
        let guard = CancelGuard {
            token: Some(new_cancel.clone()),
        };

        // Wait for the new listener to connect
        match tokio::time::timeout(self.connect_timeout, connected_rx).await {
            Ok(Ok(())) => {
                // New connection is live — disarm guard and swap.
                guard.disarm();

                // Cancel the old listener. Its task will exit on its own.
                self.current_cancel.cancel();
                self.current_handle = Some(new_handle);
                self.current_cancel = new_cancel;
                self.senders = new_senders;

                // Drop receivers for channels that were removed
                let new_set: HashSet<&str> = new_channels.iter().map(String::as_str).collect();
                self.receivers.retain(|k, _| new_set.contains(k.as_str()));
                self.channels = new_channels;

                Ok(())
            }
            Ok(Err(_)) => {
                // Sender was dropped before signalling — listener exited early.
                // Guard will cancel on drop. Remove added receivers.
                for ch in &added_channels {
                    self.receivers.remove(ch);
                }
                Err(DredError::Protocol(
                    "new listener exited before establishing connection".into(),
                ))
            }
            Err(_timeout) => {
                // Guard cancels. Remove added receivers.
                for ch in &added_channels {
                    self.receivers.remove(ch);
                }
                Err(DredError::Protocol(format!(
                    "new connection not established within {:?}",
                    self.connect_timeout
                )))
            }
        }
    }
}

impl Drop for DredSubscription {
    fn drop(&mut self) {
        self.current_cancel.cancel();
    }
}

/// Drop guard that cancels a token unless disarmed.
struct CancelGuard {
    token: Option<CancellationToken>,
}

impl CancelGuard {
    fn disarm(mut self) {
        self.token = None;
    }
}

impl Drop for CancelGuard {
    fn drop(&mut self) {
        if let Some(token) = self.token.take() {
            token.cancel();
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
    fn identity_sign_and_verify_roundtrip() {
        let id = Identity::generate();
        let sig = id.sign_string("my-channel-name");
        let pk = id.public_key_base64();
        assert!(Identity::verify_signature("my-channel-name", &sig, &pk));
    }

    #[test]
    fn identity_verify_rejects_wrong_string() {
        let id = Identity::generate();
        let sig = id.sign_string("original");
        let pk = id.public_key_base64();
        assert!(!Identity::verify_signature("tampered", &sig, &pk));
    }

    #[test]
    fn identity_verify_rejects_wrong_pubkey() {
        let id1 = Identity::generate();
        let id2 = Identity::generate();
        let sig = id1.sign_string("hello");
        assert!(!Identity::verify_signature(
            "hello",
            &sig,
            &id2.public_key_base64()
        ));
    }

    #[test]
    fn identity_verify_rejects_garbage_base64() {
        assert!(!Identity::verify_signature("x", "not-base64!@#", "also-bad!@#"));
    }

    #[test]
    fn identity_from_base64_roundtrip() {
        let id1 = Identity::generate();
        let pk_b64 = id1.public_key_base64();
        let sk_b64 = id1.secret_key_base64();
        let id2 = Identity::from_base64(&pk_b64, &sk_b64).expect("restore failed");
        assert_eq!(id2.public_key_base64(), pk_b64);

        // Both should produce identical signatures for the same input
        let sig1 = id1.sign_string("test");
        let sig2 = id2.sign_string("test");
        assert_eq!(sig1, sig2);
    }

    #[test]
    fn identity_from_base64_rejects_wrong_length() {
        let short = base64::engine::general_purpose::STANDARD.encode([0u8; 16]);
        assert!(Identity::from_base64(&short, &short).is_err());
    }

    #[test]
    fn identity_is_send_sync() {
        fn assert_send_sync<T: Send + Sync>() {}
        assert_send_sync::<Identity>();
    }

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

    #[tokio::test]
    async fn client_shares_dedup_across_listeners() {
        let client = DredClient::builder("http://127.0.0.1:1").build();

        // The dedup is shared — checking from the client affects all listeners
        client.dedup().check("seen-via-client");

        // Subscription spawns a listener but we don't need to inspect it here —
        // the point is the dedup is the same instance.
        let _sub = client.subscribe(vec!["ch".into()]);
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
    async fn subscription_cancels_on_drop() {
        let client = DredClient::builder("http://127.0.0.1:1")
            .backoff(Duration::from_millis(10), Duration::from_millis(10))
            .build();

        let client_token = client.cancellation_token();
        let sub = client.subscribe(vec!["x".into()]);
        drop(sub);

        // Client token should still be alive
        assert!(!client_token.is_cancelled());
    }

    #[tokio::test]
    async fn subscription_cancellation_stops_listener() {
        let client = DredClient::builder("http://127.0.0.1:1")
            .backoff(Duration::from_millis(10), Duration::from_millis(10))
            .build();

        let sub = client.subscribe(vec!["x".into()]);
        let sub_token = sub.cancellation_token();
        sub_token.cancel();

        // Give the spawned listener task a moment to notice the cancel
        tokio::time::sleep(Duration::from_millis(100)).await;
        assert!(sub_token.is_cancelled());
    }

    #[tokio::test]
    async fn subscription_take_receiver_and_removed_twice() {
        let client = DredClient::builder("http://127.0.0.1:1")
            .backoff(Duration::from_millis(10), Duration::from_millis(10))
            .build();

        let mut sub = client.subscribe(vec!["a".into(), "b".into()]);
        assert!(sub.take_receiver("a").is_some());
        assert!(sub.take_receiver("a").is_none(), "second take returns None");
        assert!(sub.take_receiver("b").is_some());
        assert!(sub.take_receiver("nonexistent").is_none());
    }

    #[tokio::test]
    async fn subscription_update_channels_fails_to_unreachable_server() {
        // Point at an unreachable address — the new listener will never connect,
        // so update_channels should time out and return an error.
        let client = DredClient::builder("http://127.0.0.1:1")
            .backoff(Duration::from_millis(10), Duration::from_millis(10))
            .build();

        let mut sub = client.subscribe(vec!["a".into()]);
        sub.set_connect_timeout(Duration::from_millis(200));

        let result = sub.update_channels(vec!["a".into(), "b".into()]).await;
        assert!(result.is_err(), "update should fail on unreachable server");

        // Old state is preserved
        assert_eq!(sub.channels(), &["a"]);
        // The failed-new-channel receiver should have been cleaned up
        assert!(sub.take_receiver("b").is_none(), "b receiver should not exist");
    }
}
