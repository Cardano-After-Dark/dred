use std::collections::HashSet;
use std::sync::{Arc, Mutex};
use std::time::{Duration, Instant};

use futures::StreamExt;
use reqwest::Client;
use serde::{Deserialize, Serialize};
use tracing::{debug, error, info, warn};

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

/// Channel subscription sent to POST /channels/listen
#[derive(Debug, Serialize)]
struct ChannelSubConfig {
    channel: String,
    options: ChannelSubOptions,
}

#[derive(Debug, Serialize, Default)]
struct ChannelSubOptions {
    #[serde(skip_serializing_if = "Option::is_none")]
    bookmark: Option<String>,
}

const DEFAULT_ROTATION_INTERVAL: Duration = Duration::from_secs(30);

/// Two-generation rotating deduplicator keyed on ocid.
/// Shared across reconnections so we don't re-process messages.
/// Rotates every 30s: current becomes old, old is dropped — bounds memory.
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

    /// Returns true if this ocid is new (not a duplicate).
    pub fn check(&self, ocid: &str) -> bool {
        let mut inner = self.inner.lock().unwrap();
        inner.maybe_rotate();
        if inner.current.contains(ocid) || inner.previous.contains(ocid) {
            return false;
        }
        inner.current.insert(ocid.to_string());
        true
    }

    pub fn len(&self) -> usize {
        let inner = self.inner.lock().unwrap();
        inner.current.len() + inner.previous.len()
    }

    pub fn is_empty(&self) -> bool {
        let inner = self.inner.lock().unwrap();
        inner.current.is_empty() && inner.previous.is_empty()
    }
}

impl Default for Deduplicator {
    fn default() -> Self {
        Self::new()
    }
}

/// Connect to a DRED server and stream NDJSON messages for the given channels.
/// Deduplicates on ocid. Calls `on_message` for each new message.
pub async fn listen(
    base_url: &str,
    channels: &[String],
    dedup: &Deduplicator,
    client_id: &str,
    on_message: &impl Fn(DredMessage),
) -> Result<(), Box<dyn std::error::Error>> {
    let client = Client::new();

    let subs: Vec<ChannelSubConfig> = channels
        .iter()
        .map(|ch| ChannelSubConfig {
            channel: ch.clone(),
            options: ChannelSubOptions::default(),
        })
        .collect();

    info!(
        "connecting to {}/channels/listen for {} channels",
        base_url,
        channels.len()
    );

    let resp = client
        .post(format!("{}/channels/listen", base_url))
        .header("content-type", "application/json")
        .header("clientid", client_id)
        .json(&subs)
        .send()
        .await?;

    if !resp.status().is_success() {
        return Err(format!("server returned {}", resp.status()).into());
    }

    info!("connected, streaming messages...");

    let mut stream = resp.bytes_stream();
    let mut buf = String::new();

    while let Some(chunk) = stream.next().await {
        let chunk = chunk?;
        let text = String::from_utf8_lossy(&chunk);
        buf.push_str(&text);

        // Process complete lines
        while let Some(newline_pos) = buf.find('\n') {
            let line: String = buf.drain(..=newline_pos).collect();
            let line = line.trim();

            if line.is_empty() {
                continue;
            }

            match serde_json::from_str::<DredMessage>(line) {
                Ok(msg) => {
                    if let Some(ref ocid) = msg.ocid {
                        if !dedup.check(ocid) {
                            debug!(ocid, "duplicate, skipping");
                            continue;
                        }
                    }
                    on_message(msg);
                }
                Err(e) => {
                    warn!("failed to parse NDJSON line: {e} — line: {line}");
                }
            }
        }
    }

    warn!("stream ended");
    Ok(())
}

/// Connect with auto-reconnect. Reuses the same deduplicator across reconnections.
pub async fn listen_with_reconnect(
    base_url: &str,
    channels: &[String],
    dedup: &Deduplicator,
    client_id: &str,
    on_message: impl Fn(DredMessage),
) {
    let mut backoff = Duration::from_millis(500);
    let max_backoff = Duration::from_secs(30);

    loop {
        match listen(base_url, channels, dedup, client_id, &on_message).await {
            Ok(()) => {
                info!("stream closed cleanly, reconnecting...");
                backoff = Duration::from_millis(500);
            }
            Err(e) => {
                error!("connection error: {e}");
            }
        }

        info!("reconnecting in {:?} (dedup has {} entries)...", backoff, dedup.len());
        tokio::time::sleep(backoff).await;
        backoff = (backoff * 2).min(max_backoff);
    }
}
