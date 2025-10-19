# DRED Server Configuration Files

This directory contains server-specific environment configurations for DRED deployments.

## Files

- **`us.env`** - US server configuration (preprod-us)
- **`uk.env`** - UK server configuration (preprod-uk)  
- **`de.env`** - DE server configuration (preprod-de)

## Configuration Variables

Each `.env` file contains:

- **`BF_API_KEY`** - Blockfrost API key for Cardano network access
- **`DRED_NODE_ID`** - Unique identifier for the server instance
- **`CARDANO_NETWORK`** - Cardano network (preprod/mainnet)
- **`LOGGING`** - Log level configuration

## Usage

Configuration files are automatically loaded by the setup script based on server name:

```bash
# Setup US server - loads config/us.env
make setup-dred us

# Setup UK server - loads config/uk.env  
make setup-dred uk

# Setup DE server - loads config/de.env
make setup-dred de
```

## Adding New Servers

1. Create a new `.env` file (e.g., `fr.env` for France)
2. Add the server IP to `servers.conf` (e.g., `FR=192.168.1.100`)
3. Set unique `DRED_NODE_ID` (e.g., `preprod-fr`)
4. Run `make setup-dred fr`

## Important Notes

- Each server **must have a unique `DRED_NODE_ID`**
- Duplicate node IDs will prevent replication from working
