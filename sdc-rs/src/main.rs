use sdc_rs::DredClient;
use tracing::info;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    let base_url = std::env::var("DRED_URL").unwrap_or_else(|_| "http://localhost:3029".into());
    let channels: Vec<String> = std::env::args().skip(1).collect();

    if channels.is_empty() {
        eprintln!("usage: sdc-rs <channel1> [channel2] ...");
        eprintln!("  env DRED_URL=http://localhost:3029 (default)");
        std::process::exit(1);
    }

    info!("sdc-rs starting — server: {base_url}, channels: {channels:?}");

    let client = DredClient::builder(&base_url).build();
    let token = client.cancellation_token();

    let (listener, mut rxs) = client.listen(channels);

    // Cancel on Ctrl-C
    tokio::spawn(async move {
        tokio::signal::ctrl_c().await.ok();
        info!("ctrl-c received, shutting down");
        token.cancel();
    });

    // Spawn the listener
    tokio::spawn(async move { listener.run().await });

    // Merge all per-channel receivers into a single print loop
    let (merged_tx, mut merged_rx) = tokio::sync::mpsc::channel(256);
    for (_name, mut rx) in rxs.drain() {
        let tx = merged_tx.clone();
        tokio::spawn(async move {
            while let Some(msg) = rx.recv().await {
                if tx.send(msg).await.is_err() {
                    break;
                }
            }
        });
    }
    drop(merged_tx);

    while let Some(msg) = merged_rx.recv().await {
        if let Ok(json) = serde_json::to_string(&msg) {
            println!("{json}");
        }
    }
}
