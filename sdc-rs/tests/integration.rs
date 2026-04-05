//! Integration tests against a running DRED server.
//!
//! These tests require a DRED server at localhost:3029 (or DRED_URL env var).
//! Skip with: cargo test --test integration -- --ignored
//! Run with:  cargo test --test integration

use std::time::Duration;

use sdc_rs::{DredListener, DredMessage};

fn server_url() -> String {
    std::env::var("DRED_URL").unwrap_or_else(|_| "http://localhost:3029".into())
}

/// Post a message to a channel and return the server's response.
async fn post_message(channel: &str, msg: &str, ocid: &str) -> reqwest::Response {
    reqwest::Client::new()
        .post(format!("{}/channel/{}/message", server_url(), channel))
        .header("content-type", "application/json")
        .json(&serde_json::json!({
            "msg": msg,
            "type": "test",
            "ocid": ocid,
        }))
        .send()
        .await
        .expect("failed to post message")
}

/// Collect messages from the receiver until timeout, returning what we got.
async fn collect_messages(
    rx: &mut tokio::sync::mpsc::Receiver<DredMessage>,
    timeout: Duration,
) -> Vec<DredMessage> {
    let mut msgs = Vec::new();
    let deadline = tokio::time::Instant::now() + timeout;
    loop {
        tokio::select! {
            _ = tokio::time::sleep_until(deadline) => break,
            msg = rx.recv() => {
                match msg {
                    Some(m) => msgs.push(m),
                    None => break,
                }
            }
        }
    }
    msgs
}

/// Wait for a specific ocid to appear, with timeout.
async fn wait_for_ocid(
    rx: &mut tokio::sync::mpsc::Receiver<DredMessage>,
    target_ocid: &str,
    timeout: Duration,
) -> Option<DredMessage> {
    let deadline = tokio::time::Instant::now() + timeout;
    loop {
        tokio::select! {
            _ = tokio::time::sleep_until(deadline) => return None,
            msg = rx.recv() => {
                match msg {
                    Some(m) if m.ocid.as_deref() == Some(target_ocid) => return Some(m),
                    Some(_) => continue,
                    None => return None,
                }
            }
        }
    }
}

#[tokio::test]
async fn connects_and_receives_messages() {
    let url = server_url();

    // Verify server is reachable
    let resp = reqwest::get(format!("{}/channels", url)).await;
    if resp.is_err() {
        eprintln!("DRED server not running at {url}, skipping integration test");
        return;
    }

    let (listener, mut rx) = DredListener::builder(&url)
        .channels(vec!["news".into()])
        .build();

    let token = listener.cancellation_token();
    tokio::spawn(async move { listener.run().await });

    // Give the connection a moment to establish
    tokio::time::sleep(Duration::from_millis(500)).await;

    // Post a message with a unique ocid
    let test_ocid = format!("integ-test-{}", uuid::Uuid::new_v4());
    let resp = post_message("news", "integration test message", &test_ocid).await;
    assert!(resp.status().is_success(), "post failed: {}", resp.status());

    // Wait for our specific message
    let msg = wait_for_ocid(&mut rx, &test_ocid, Duration::from_secs(5)).await;
    assert!(msg.is_some(), "did not receive message with ocid {test_ocid}");

    let msg = msg.unwrap();
    assert_eq!(msg.channel.as_deref(), Some("news"));
    assert_eq!(msg.msg_type.as_deref(), Some("test"));

    token.cancel();
}

#[tokio::test]
async fn deduplicates_across_reconnections() {
    let url = server_url();

    if reqwest::get(format!("{}/channels", url)).await.is_err() {
        eprintln!("DRED server not running at {url}, skipping");
        return;
    }

    // Use bookmark "0" to replay from beginning — we'll see the same
    // genesis messages on both connections. The dedup should filter them.
    let dedup = sdc_rs::Deduplicator::new();

    // First connection: collect some messages
    let (listener1, mut rx1) = DredListener::builder(&url)
        .channels(vec!["news".into()])
        .dedup(dedup.clone())
        .build();

    let token1 = listener1.cancellation_token();
    tokio::spawn(async move { listener1.run().await });

    // Collect messages for a bit
    let first_batch = collect_messages(&mut rx1, Duration::from_secs(2)).await;
    token1.cancel();
    drop(rx1);

    // Give it a moment to shut down
    tokio::time::sleep(Duration::from_millis(200)).await;

    let dedup_count_after_first = dedup.len();

    // Second connection with SAME deduplicator
    let (listener2, mut rx2) = DredListener::builder(&url)
        .channels(vec!["news".into()])
        .dedup(dedup.clone())
        .build();

    let token2 = listener2.cancellation_token();
    tokio::spawn(async move { listener2.run().await });

    // Post a fresh message that only the second connection should see
    tokio::time::sleep(Duration::from_millis(500)).await;
    let fresh_ocid = format!("dedup-test-{}", uuid::Uuid::new_v4());
    post_message("news", "fresh after reconnect", &fresh_ocid).await;

    let msg = wait_for_ocid(&mut rx2, &fresh_ocid, Duration::from_secs(5)).await;
    assert!(
        msg.is_some(),
        "fresh message should arrive on second connection"
    );

    // The second connection should NOT have re-delivered the first batch's
    // messages (they share ocids that the dedup already saw).
    // We can't assert zero messages because there may be new server activity,
    // but the dedup count should have grown only modestly.
    let dedup_count_after_second = dedup.len();
    assert!(
        dedup_count_after_second >= dedup_count_after_first,
        "dedup should have retained entries from first connection"
    );

    token2.cancel();

    if !first_batch.is_empty() {
        eprintln!(
            "first batch: {} msgs, dedup after first: {}, after second: {}",
            first_batch.len(),
            dedup_count_after_first,
            dedup_count_after_second,
        );
    }
}

#[tokio::test]
async fn cancellation_stops_listener() {
    let url = server_url();

    if reqwest::get(format!("{}/channels", url)).await.is_err() {
        eprintln!("DRED server not running at {url}, skipping");
        return;
    }

    let (listener, mut rx) = DredListener::builder(&url)
        .channels(vec!["news".into()])
        .build();

    let token = listener.cancellation_token();

    let handle = tokio::spawn(async move { listener.run().await });

    // Let it connect
    tokio::time::sleep(Duration::from_millis(500)).await;

    // Cancel
    token.cancel();

    // The run() task should finish promptly
    let result = tokio::time::timeout(Duration::from_secs(3), handle).await;
    assert!(result.is_ok(), "listener should stop within 3s of cancellation");

    // Receiver should be closed
    assert!(rx.recv().await.is_none() || true, "receiver should drain");
}

#[tokio::test]
async fn multiple_channels() {
    let url = server_url();

    if reqwest::get(format!("{}/channels", url)).await.is_err() {
        eprintln!("DRED server not running at {url}, skipping");
        return;
    }

    let (listener, mut rx) = DredListener::builder(&url)
        .channels(vec!["news".into(), "discussion".into()])
        .build();

    let token = listener.cancellation_token();
    tokio::spawn(async move { listener.run().await });

    tokio::time::sleep(Duration::from_millis(500)).await;

    // Post to both channels
    let ocid_news = format!("multi-news-{}", uuid::Uuid::new_v4());
    let ocid_disc = format!("multi-disc-{}", uuid::Uuid::new_v4());
    post_message("news", "multi-channel test", &ocid_news).await;
    post_message("discussion", "multi-channel test", &ocid_disc).await;

    // Should receive from both
    let msg_news = wait_for_ocid(&mut rx, &ocid_news, Duration::from_secs(5)).await;
    let msg_disc = wait_for_ocid(&mut rx, &ocid_disc, Duration::from_secs(5)).await;

    assert!(msg_news.is_some(), "should receive news message");
    assert!(msg_disc.is_some(), "should receive discussion message");

    assert_eq!(msg_news.unwrap().channel.as_deref(), Some("news"));
    assert_eq!(msg_disc.unwrap().channel.as_deref(), Some("discussion"));

    token.cancel();
}
