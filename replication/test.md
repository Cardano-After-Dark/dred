# Building and Testing the Replication Feature

This document provides instructions for building and testing the message replication feature in the Dred server.

## Setup and Build

First, ensure you're on the correct branch and set up your environment:

```bash
# Ensure you're on the correct branch
git checkout feature/message-duplication

# Clean the environment
git clean -fdx

# Install dependencies
pnpm install

# Build the project
pnpm build
```

## Running the Simplified Test

We've created a simplified, more reliable replication test that directly creates and configures the server instances:

```bash
# Run only the replication test with logging enabled
LOGGING=1 pnpm test replication.test.ts
```

This test:
1. Creates two isolated server instances with separate Redis databases
2. Manually configures static host discovery between them
3. Creates a channel on the first server and verifies it replicates to the second
4. Sends a message from the first server and verifies it's received on the second

## Troubleshooting Tips

If you encounter test timeouts or issues:

1. **Redis Connection**
   - Ensure Redis is running on the default port (6379)
   - If using a different port, update the Redis URL in the test file

2. **Port Conflicts**
   - The test uses ports 54032 and 54033 to avoid conflicts
   - If these ports are in use, change them in the test file

3. **Timing Issues**
   - If tests fail due to timing, try increasing the delay values
   - Key places to adjust: after server setup, after channel creation, and when waiting for messages

4. **Isolation**
   - The test uses separate Redis databases (10 and 11) to avoid interference
   - If these databases contain data, try different numbers

## Manual Testing

To manually test replication between multiple running servers:

1. Start two server instances:
```bash
# Terminal 1
SERVER_ID=server1 PORT=4001 REDIS_DB=1 pnpm start

# Terminal 2
SERVER_ID=server2 PORT=4002 REDIS_DB=2 pnpm start
```

2. Create a channel on server1:
```bash
curl -X POST http://localhost:4001/channel/test-channel
```

3. Send a message to server1:
```bash
curl -X POST -H "Content-Type: application/json" \
     -d '{"msg":"Test message", "type":"text"}' \
     http://localhost:4001/channel/test-channel/message
```

4. Check if the message appears in server2:
```bash
curl http://localhost:4002/channels
```

And then connect a client to server2 to see if messages are received. 