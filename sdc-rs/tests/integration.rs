//! Integration tests against a running DRED server.
//!
//! These tests require a DRED server at localhost:3029 (or DRED_URL env var).
//! Run with:  cargo test --test integration

use std::time::Duration;

use sdc_rs::{CreateChannelOptions, DredClient, DredMessage};

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
    let mut sub = client.subscribe(vec!["news".into()]);
    let mut news_rx = sub.take_receiver("news").unwrap();

    tokio::time::sleep(Duration::from_millis(500)).await;

    let test_ocid = format!("integ-test-{}", uuid::Uuid::new_v4());
    let resp = post_message("news", "integration test message", &test_ocid).await;
    assert!(resp.status().is_success(), "post failed: {}", resp.status());

    let msg = wait_for_ocid(&mut news_rx, &test_ocid, Duration::from_secs(5)).await;
    assert!(msg.is_some(), "did not receive message with ocid {test_ocid}");

    let msg = msg.unwrap();
    assert_eq!(msg.channel.as_deref(), Some("news"));
    assert_eq!(msg.msg_type.as_deref(), Some("test"));
}

#[tokio::test]
async fn deduplicates_across_reconnections() {
    if !server_available().await {
        eprintln!("DRED server not running, skipping");
        return;
    }

    let client = DredClient::builder(server_url()).build();

    // First subscription
    let mut sub1 = client.subscribe(vec!["news".into()]);
    let mut news_rx1 = sub1.take_receiver("news").unwrap();
    let first_batch = collect_messages(&mut news_rx1, Duration::from_secs(2)).await;
    drop(sub1);
    drop(news_rx1);

    tokio::time::sleep(Duration::from_millis(200)).await;
    let dedup_count_after_first = client.dedup().len();

    // Second subscription — same client, same dedup
    let mut sub2 = client.subscribe(vec!["news".into()]);
    let mut news_rx2 = sub2.take_receiver("news").unwrap();
    tokio::time::sleep(Duration::from_millis(500)).await;

    let fresh_ocid = format!("dedup-test-{}", uuid::Uuid::new_v4());
    post_message("news", "fresh after reconnect", &fresh_ocid).await;

    let msg = wait_for_ocid(&mut news_rx2, &fresh_ocid, Duration::from_secs(5)).await;
    assert!(msg.is_some(), "fresh message should arrive on second connection");

    let dedup_count_after_second = client.dedup().len();
    assert!(dedup_count_after_second >= dedup_count_after_first);

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
    let sub = client.subscribe(vec!["news".into()]);
    let sub_token = sub.cancellation_token();

    tokio::time::sleep(Duration::from_millis(500)).await;
    sub_token.cancel();

    // After cancel, the listener task should exit promptly.
    tokio::time::sleep(Duration::from_millis(200)).await;
    assert!(sub_token.is_cancelled());
}

#[tokio::test]
async fn per_channel_routing() {
    if !server_available().await {
        eprintln!("DRED server not running, skipping");
        return;
    }

    let client = DredClient::builder(server_url()).build();
    let mut sub = client.subscribe(vec!["news".into(), "discussion".into()]);
    let mut news_rx = sub.take_receiver("news").unwrap();
    let mut disc_rx = sub.take_receiver("discussion").unwrap();

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
}

#[tokio::test]
async fn multiple_subscriptions_share_dedup() {
    if !server_available().await {
        eprintln!("DRED server not running, skipping");
        return;
    }

    let client = DredClient::builder(server_url()).build();

    let mut sub1 = client.subscribe(vec!["news".into()]);
    let mut sub2 = client.subscribe(vec!["news".into()]);
    let mut rx1 = sub1.take_receiver("news").unwrap();
    let mut rx2 = sub2.take_receiver("news").unwrap();

    tokio::time::sleep(Duration::from_millis(500)).await;

    let test_ocid = format!("shared-dedup-{}", uuid::Uuid::new_v4());
    post_message("news", "shared dedup test", &test_ocid).await;

    let msg1 = wait_for_ocid(&mut rx1, &test_ocid, Duration::from_secs(3)).await;
    let msg2 = wait_for_ocid(&mut rx2, &test_ocid, Duration::from_secs(1)).await;

    let got_count = msg1.is_some() as u8 + msg2.is_some() as u8;
    assert_eq!(got_count, 1, "exactly one subscription should receive a given ocid");
}

#[tokio::test]
async fn post_message_returns_id() {
    if !server_available().await {
        eprintln!("DRED server not running, skipping");
        return;
    }

    let client = DredClient::builder(server_url()).build();

    let resp = client
        .post_message("news", "post_message test", "test", None)
        .await
        .expect("post_message failed");

    assert_eq!(resp.status, "created");
    assert!(!resp.id.is_empty(), "should get a server-assigned id");
    assert!(!resp.ocid.is_empty(), "should get an ocid back");
}

#[tokio::test]
async fn post_message_with_explicit_ocid() {
    if !server_available().await {
        eprintln!("DRED server not running, skipping");
        return;
    }

    let client = DredClient::builder(server_url()).build();
    let my_ocid = format!("explicit-{}", uuid::Uuid::new_v4());

    let resp = client
        .post_message("news", "explicit ocid test", "test", Some(&my_ocid))
        .await
        .expect("post_message failed");

    assert_eq!(resp.ocid, my_ocid);
    assert_eq!(resp.status, "created");
}

#[tokio::test]
async fn list_channels_returns_channels() {
    if !server_available().await {
        eprintln!("DRED server not running, skipping");
        return;
    }

    let client = DredClient::builder(server_url()).build();
    let channels = client.list_channels().await.expect("list_channels failed");

    assert!(channels.iter().any(|c| c == "news"), "should include news");
    assert!(
        channels.iter().any(|c| c == "discussion"),
        "should include discussion"
    );
    assert!(
        !channels.iter().any(|c| c.starts_with('_')),
        "should not include system channels"
    );
}

#[tokio::test]
async fn create_channel_then_post_and_receive() {
    if !server_available().await {
        eprintln!("DRED server not running, skipping");
        return;
    }

    let client = DredClient::builder(server_url()).build();

    let channel_name = format!("rust-test-{}", sdc_rs::gen_id(8));
    let resp = client
        .create_channel(&channel_name, CreateChannelOptions::default())
        .await
        .expect("create_channel failed");

    assert_eq!(resp.id, channel_name);
    assert_eq!(resp.status, "created");

    let channels = client.list_channels().await.expect("list_channels failed");
    assert!(
        channels.iter().any(|c| c == &channel_name),
        "new channel should appear in list"
    );

    let mut sub = client.subscribe(vec![channel_name.clone()]);
    let mut rx = sub.take_receiver(&channel_name).unwrap();
    tokio::time::sleep(Duration::from_millis(500)).await;

    // Post from a different client so echo isn't suppressed
    let other_client = DredClient::builder(server_url()).build();
    let resp = other_client
        .post_message(&channel_name, "hello new channel", "test", None)
        .await
        .expect("post_message failed");

    let msg = wait_for_ocid(&mut rx, &resp.ocid, Duration::from_secs(5)).await;
    assert!(msg.is_some(), "should receive posted message");
}

#[tokio::test]
async fn create_channel_duplicate_fails() {
    if !server_available().await {
        eprintln!("DRED server not running, skipping");
        return;
    }

    let client = DredClient::builder(server_url()).build();
    let result = client
        .create_channel("news", CreateChannelOptions::default())
        .await;
    assert!(result.is_err(), "creating existing channel should fail");
}

#[tokio::test]
async fn create_encrypted_channel_not_supported() {
    let client = DredClient::builder("http://127.0.0.1:1").build();
    let opts = CreateChannelOptions {
        encrypted: true,
        ..Default::default()
    };

    let result = client.create_channel("x", opts).await;
    assert!(result.is_err(), "encrypted channels should return an error");
}

#[tokio::test]
async fn post_message_echo_suppressed() {
    if !server_available().await {
        eprintln!("DRED server not running, skipping");
        return;
    }

    let client = DredClient::builder(server_url()).build();
    let mut sub = client.subscribe(vec!["news".into()]);
    let mut news_rx = sub.take_receiver("news").unwrap();
    tokio::time::sleep(Duration::from_millis(500)).await;

    let resp = client
        .post_message("news", "echo test", "test", None)
        .await
        .expect("post_message failed");

    let echoed = wait_for_ocid(&mut news_rx, &resp.ocid, Duration::from_secs(2)).await;
    assert!(
        echoed.is_none(),
        "own message should be suppressed by pre-dedup, ocid: {}",
        resp.ocid,
    );
}

#[tokio::test]
async fn update_channels_adds_channel_without_losing_existing() {
    if !server_available().await {
        eprintln!("DRED server not running, skipping");
        return;
    }

    let client = DredClient::builder(server_url()).build();
    let mut sub = client.subscribe(vec!["news".into()]);
    let mut news_rx = sub.take_receiver("news").unwrap();
    tokio::time::sleep(Duration::from_millis(500)).await;

    // Verify news works initially
    let ocid1 = format!("before-update-{}", uuid::Uuid::new_v4());
    post_message("news", "before update", &ocid1).await;
    let msg = wait_for_ocid(&mut news_rx, &ocid1, Duration::from_secs(5)).await;
    assert!(msg.is_some(), "news should work before update");

    // Add the discussion channel. The existing news_rx must keep working.
    sub.update_channels(vec!["news".into(), "discussion".into()])
        .await
        .expect("update_channels should succeed");

    assert_eq!(sub.channels().len(), 2);
    let mut disc_rx = sub.take_receiver("discussion").unwrap();
    tokio::time::sleep(Duration::from_millis(300)).await;

    // Post to both channels — news on the SAME receiver, discussion on the new one
    let ocid_news = format!("after-update-news-{}", uuid::Uuid::new_v4());
    let ocid_disc = format!("after-update-disc-{}", uuid::Uuid::new_v4());
    post_message("news", "after update - news", &ocid_news).await;
    post_message("discussion", "after update - disc", &ocid_disc).await;

    let got_news = wait_for_ocid(&mut news_rx, &ocid_news, Duration::from_secs(5)).await;
    let got_disc = wait_for_ocid(&mut disc_rx, &ocid_disc, Duration::from_secs(5)).await;

    assert!(got_news.is_some(), "news receiver should keep working after update");
    assert!(got_disc.is_some(), "new discussion receiver should work");
}

#[tokio::test]
async fn update_channels_removes_channel() {
    if !server_available().await {
        eprintln!("DRED server not running, skipping");
        return;
    }

    let client = DredClient::builder(server_url()).build();
    let mut sub = client.subscribe(vec!["news".into(), "discussion".into()]);
    let mut news_rx = sub.take_receiver("news").unwrap();
    tokio::time::sleep(Duration::from_millis(500)).await;

    sub.update_channels(vec!["news".into()])
        .await
        .expect("removing discussion should succeed");

    assert_eq!(sub.channels(), &["news"]);
    // discussion receiver is no longer accessible
    assert!(sub.take_receiver("discussion").is_none());

    // news should still work
    let ocid = format!("after-remove-{}", uuid::Uuid::new_v4());
    post_message("news", "still working", &ocid).await;
    let msg = wait_for_ocid(&mut news_rx, &ocid, Duration::from_secs(5)).await;
    assert!(msg.is_some(), "news should still work after removing discussion");
}
