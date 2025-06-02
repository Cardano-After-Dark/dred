# Testing Replication Feature

## Setup

Ensure you are on the correct branch and setup your environment. 

```bash
node --version
v20.19.2
pnpm --version
10.11.0
```

```bash
git checkout feature/message-duplication
git clean -fdx
pnpm install
pnpm build
```

## Running Tests

### Basic Test Run


```bash
pnpm test replication | pnpm exec pino-pretty
```

### More logging

```bash
# Enable application logging
LOGGING=1 pnpm test replication | pnpm exec pino-pretty
```

### Logging comparison

```bash
# run test+log
pnpm logtest replication

# do some changes in code ..

# rerun test + log
pnpm logtest replication

# compare the test out
pnpm logdiff replication
```

NOTE: if you need more logging in logtest, just change `logtest.sh`, e.g. add `LOGGING=1`

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