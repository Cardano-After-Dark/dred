use sdc_rs::{Deduplicator, listen_with_reconnect};
use tracing::info;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    let base_url = std::env::var("DRED_URL").unwrap_or_else(|_| "http://localhost:3000".into());
    let channels: Vec<String> = std::env::args().skip(1).collect();

    if channels.is_empty() {
        eprintln!("usage: sdc-rs <channel1> [channel2] ...");
        eprintln!("  env DRED_URL=http://localhost:3000 (default)");
        std::process::exit(1);
    }

    let dedup = Deduplicator::new();
    let client_id = uuid::Uuid::new_v4().to_string();

    info!("sdc-rs starting — server: {base_url}, channels: {channels:?}, clientId: {client_id}");

    listen_with_reconnect(&base_url, &channels, &dedup, &client_id, |msg| {
        if let Ok(json) = serde_json::to_string(&msg) {
            println!("{json}");
        }
    })
    .await;
}
