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

## Running Tests

### Basic Test Run

To run the replication test specifically:

```bash
# Run only the replication test
pnpm test replication.test.ts
```

### Debugging with Logging

For more detailed information about what's happening during the test, enable logging:

```bash
# Enable application logging
LOGGING=1 pnpm test replication.test.ts
```

### Monitoring Redis Operations

To see all Redis operations during the test (useful for debugging replication issues):

```bash
# Enable both application logging and Redis monitoring
LOGGING=1 REDIS_MONITOR=1 pnpm test replication.test.ts
```

### Focusing on Specific Test Cases

If you need to focus on a specific test case, modify the test file to use `fit` instead of `it` for that test:

```typescript
// Change this
it("replicates messages between servers", async () => {
  // test code
});

// To this to focus only on this test
fit("replicates messages between servers", async () => {
  // test code
});
```

Then run the test as normal:

```bash
pnpm test replication.test.ts
```

## Expected Results

When running the replication test, you should see:

1. Two server instances starting up
2. A channel being created on the first server
3. The channel being replicated to the second server
4. A message being sent to the first server
5. The message being replicated to the second server
6. A client connected to the second server receiving the message

If all of these steps succeed, the test will pass, confirming that message replication is working correctly.

## Troubleshooting

If the test fails, check the following:

1. Ensure Redis is running and accessible
2. Look at the logs for any errors in the replication setup
3. Verify that the `sourceServer` field is being properly set on messages
4. Check that server discovery is working correctly and finding all servers
5. Verify that the subscription to channels on the second server is working

Using `LOGGING=1 REDIS_MONITOR=1` will provide the most detailed information for diagnosing issues. 