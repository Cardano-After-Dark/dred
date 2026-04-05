//! Integration tests against a running DRED server.
//!
//! These tests require a DRED server at localhost:3029 (or DRED_URL env var).
//! Run with:  cargo test --test integration

use std::time::Duration;

use sdc_rs::{DredClient, DredMessage};

fn server_url() -> String {
    std::env::var("DRED_URL").unwrap_or_else(|_| "http://localhost:3029".into())
}

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

async fn server_available() -> bool {
    reqwest::get(format!("{}/channels", server_url()))
        .await
        .is_ok()
}

#[tokio::test]
async fn connects_and_receives_messages() {
    if !server_available().await {
        eprintln!("DRED server not running, skipping");
        return;
    }

    let client = DredClient::builder(server_url()).build();
    let (listener, mut rxs) = client.listen(vec!["news".into()]);
    let mut news_rx = rxs.remove("news").unwrap();
    let token = client.cancellation_token();

    tokio::spawn(async move { listener.run().await });
    tokio::time::sleep(Duration::from_millis(500)).await;

    let test_ocid = format!("integ-test-{}", uuid::Uuid::new_v4());
    let resp = post_message("news", "integration test message", &test_ocid).await;
    assert!(resp.status().is_success(), "post failed: {}", resp.status());

    let msg = wait_for_ocid(&mut news_rx, &test_ocid, Duration::from_secs(5)).await;
    assert!(msg.is_some(), "did not receive message with ocid {test_ocid}");

    let msg = msg.unwrap();
    assert_eq!(msg.channel.as_deref(), Some("news"));
    assert_eq!(msg.msg_type.as_deref(), Some("test"));

    token.cancel();
}

#[tokio::test]
async fn deduplicates_across_reconnections() {
    if !server_available().await {
        eprintln!("DRED server not running, skipping");
        return;
    }

    let client = DredClient::builder(server_url()).build();

    // First connection
    let (listener1, mut rxs1) = client.listen(vec!["news".into()]);
    let mut news_rx1 = rxs1.remove("news").unwrap();
    let token1 = listener1.cancellation_token();

    tokio::spawn(async move { listener1.run().await });
    let first_batch = collect_messages(&mut news_rx1, Duration::from_secs(2)).await;
    token1.cancel();
    drop(news_rx1);

    tokio::time::sleep(Duration::from_millis(200)).await;

    let dedup_count_after_first = client.dedup().len();

    // Second connection — same client, same dedup
    let (listener2, mut rxs2) = client.listen(vec!["news".into()]);
    let mut news_rx2 = rxs2.remove("news").unwrap();

    tokio::spawn(async move { listener2.run().await });
    tokio::time::sleep(Duration::from_millis(500)).await;

    let fresh_ocid = format!("dedup-test-{}", uuid::Uuid::new_v4());
    post_message("news", "fresh after reconnect", &fresh_ocid).await;

    let msg = wait_for_ocid(&mut news_rx2, &fresh_ocid, Duration::from_secs(5)).await;
    assert!(msg.is_some(), "fresh message should arrive on second connection");

    let dedup_count_after_second = client.dedup().len();
    assert!(dedup_count_after_second >= dedup_count_after_first);

    client.cancellation_token().cancel();

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
    if !server_available().await {
        eprintln!("DRED server not running, skipping");
        return;
    }

    let client = DredClient::builder(server_url()).build();
    let (listener, mut rxs) = client.listen(vec!["news".into()]);
    let mut news_rx = rxs.remove("news").unwrap();

    let handle = tokio::spawn(async move { listener.run().await });

    tokio::time::sleep(Duration::from_millis(500)).await;
    client.cancellation_token().cancel();

    let result = tokio::time::timeout(Duration::from_secs(3), handle).await;
    assert!(result.is_ok(), "listener should stop within 3s of cancellation");

    let remaining = collect_messages(&mut news_rx, Duration::from_millis(100)).await;
    drop(remaining);
}

#[tokio::test]
async fn per_channel_routing() {
    if !server_available().await {
        eprintln!("DRED server not running, skipping");
        return;
    }

    let client = DredClient::builder(server_url()).build();
    let (listener, mut rxs) = client.listen(vec!["news".into(), "discussion".into()]);
    let mut news_rx = rxs.remove("news").unwrap();
    let mut disc_rx = rxs.remove("discussion").unwrap();

    tokio::spawn(async move { listener.run().await });
    tokio::time::sleep(Duration::from_millis(500)).await;

    let ocid_news = format!("route-news-{}", uuid::Uuid::new_v4());
    let ocid_disc = format!("route-disc-{}", uuid::Uuid::new_v4());
    post_message("news", "routed to news", &ocid_news).await;
    post_message("discussion", "routed to discussion", &ocid_disc).await;

    let msg_news = wait_for_ocid(&mut news_rx, &ocid_news, Duration::from_secs(5)).await;
    let msg_disc = wait_for_ocid(&mut disc_rx, &ocid_disc, Duration::from_secs(5)).await;

    assert!(msg_news.is_some(), "news message should arrive on news_rx");
    assert!(msg_disc.is_some(), "discussion message should arrive on disc_rx");
    assert_eq!(msg_news.unwrap().channel.as_deref(), Some("news"));
    assert_eq!(msg_disc.unwrap().channel.as_deref(), Some("discussion"));

    // Verify isolation
    let stray = collect_messages(&mut disc_rx, Duration::from_millis(200)).await;
    for m in &stray {
        assert_ne!(
            m.ocid.as_deref(),
            Some(ocid_news.as_str()),
            "news message leaked to discussion receiver"
        );
    }

    client.cancellation_token().cancel();
}

#[tokio::test]
async fn multiple_listeners_share_dedup() {
    if !server_available().await {
        eprintln!("DRED server not running, skipping");
        return;
    }

    let client = DredClient::builder(server_url()).build();

    // Two listeners on the same channel, same client
    let (listener1, mut rxs1) = client.listen(vec!["news".into()]);
    let (listener2, mut rxs2) = client.listen(vec!["news".into()]);
    let mut rx1 = rxs1.remove("news").unwrap();
    let mut rx2 = rxs2.remove("news").unwrap();

    tokio::spawn(async move { listener1.run().await });
    tokio::spawn(async move { listener2.run().await });
    tokio::time::sleep(Duration::from_millis(500)).await;

    let test_ocid = format!("shared-dedup-{}", uuid::Uuid::new_v4());
    post_message("news", "shared dedup test", &test_ocid).await;

    // One listener should get it, the other should dedup it
    let msg1 = wait_for_ocid(&mut rx1, &test_ocid, Duration::from_secs(3)).await;
    let msg2 = wait_for_ocid(&mut rx2, &test_ocid, Duration::from_secs(1)).await;

    // Exactly one should receive it (dedup is shared)
    let got_count = msg1.is_some() as u8 + msg2.is_some() as u8;
    assert_eq!(got_count, 1, "exactly one listener should receive a given ocid");

    client.cancellation_token().cancel();
}
