---
title: API Reference
description: Complete reference for the DRED client library
---

This guide covers the DRED client library API for building real-time messaging into your Cardano applications.

---

## Installation

Install the DRED client package:

```bash
npm install @cardano-after-dark/dred-client
```

For Node.js environments, import from the Node.js build:

```javascript
import { DredClient } from '@cardano-after-dark/dred-client/node';
```

For browser environments, use the default import:

```javascript
import { DredClient } from '@cardano-after-dark/dred-client';
```

---

## DredClient

The main class for interacting with the DRED network.

### Constructor

```typescript
new DredClient(options: DredClientOptions)
```

**Options:**

```typescript
interface DredClientOptions {
  neighborhood: string;              // The neighborhood ID for your application
  waitFor?: 'minimum' | 'all';      // Connection threshold (default: 'minimum')
  name?: string;                     // Optional client name for debugging
  connectionSettings?: {             // Optional connection configuration
    minConnections?: number;         // Minimum nodes to connect to (default: 2)
    maxConnections?: number;         // Maximum nodes to connect to (default: 5)
    timeout?: number;                // Connection timeout in ms (default: 30000)
  };
}
```

**Example:**

```javascript
const dred = new DredClient({
  neighborhood: "my-card-game",
  waitFor: "minimum",
  name: "player-client",
  connectionSettings: {
    minConnections: 2,
    maxConnections: 3
  }
});
```

---

## Connection Methods

### connect()

Connects to DRED nodes in the specified neighborhood.

```typescript
async connect(): Promise<void>
```

**Example:**

```javascript
await dred.connect();
console.log("Connected to DRED network");
```

### disconnect()

Disconnects from all DRED nodes.

```typescript
disconnect(): void
```

**Example:**

```javascript
dred.disconnect();
```

---

## Channel Methods

### createChannel()

Creates a new message channel.

```typescript
async createChannel(options: CreateChannelOptions): Promise<string>
```

**Options:**

```typescript
interface CreateChannelOptions {
  name?: string;              // Optional channel name
  ttl?: number;              // Time-to-live in seconds (default: 86400)
  maxMessages?: number;      // Maximum messages to retain (default: 1000)
}
```

**Returns:** Channel ID

**Example:**

```javascript
const channelId = await dred.createChannel({
  name: "game-room-42",
  ttl: 3600  // 1 hour
});
```

### joinChannel()

Joins an existing channel.

```typescript
async joinChannel(channelName: string): Promise<void>
```

**Example:**

```javascript
await dred.joinChannel("game-room-42");
```

### leaveChannel()

Leaves a channel and stops receiving messages.

```typescript
leaveChannel(channelName: string): void
```

**Example:**

```javascript
dred.leaveChannel("game-room-42");
```

---

## Messaging Methods

### postMessage()

Sends a message to a channel.

```typescript
async postMessage(channelName: string, message: DredMessage): Promise<void>
```

**Message Structure:**

```typescript
interface DredMessage {
  type: string;                    // Message type identifier
  msg: any;                       // Message payload (any JSON-serializable data)
  'content-type'?: string;        // Optional content type (e.g., 'text/plain', 'application/json')
  ocid?: string;                  // Optional client-generated message ID
}
```

**Example:**

```javascript
await dred.postMessage("game-room-42", {
  type: "player-move",
  msg: {
    player: "alice",
    action: "bet",
    amount: 100
  },
  'content-type': 'application/json'
});
```

### subscribe()

Subscribes to messages on a channel.

```typescript
subscribe(channelName: string, callback: MessageCallback): void
```

**Callback Signature:**

```typescript
type MessageCallback = (message: ReceivedMessage) => void;

interface ReceivedMessage {
  type: string;
  msg: any;
  'content-type'?: string;
  ocid?: string;
  timestamp?: number;           // Server timestamp
  serverId?: string;           // Originating server
}
```

**Example:**

```javascript
dred.subscribe("game-room-42", (message) => {
  console.log(`[${message.type}]:`, message.msg);

  if (message.type === "player-move") {
    handlePlayerMove(message.msg);
  }
});
```

### unsubscribe()

Removes a message callback from a channel.

```typescript
unsubscribe(channelName: string, callback: MessageCallback): void
```

**Example:**

```javascript
const myCallback = (message) => { /* ... */ };

dred.subscribe("game-room-42", myCallback);
// Later...
dred.unsubscribe("game-room-42", myCallback);
```

---

## State and Events

### Connection Events

Listen for connection state changes:

```typescript
dred.on('connected', () => {
  console.log('Connected to DRED network');
});

dred.on('disconnected', () => {
  console.log('Disconnected from DRED network');
});

dred.on('error', (error) => {
  console.error('DRED error:', error);
});
```

### Channel Events

Listen for channel-specific events:

```typescript
dred.on('channel-joined', (channelName) => {
  console.log(`Joined channel: ${channelName}`);
});

dred.on('channel-left', (channelName) => {
  console.log(`Left channel: ${channelName}`);
});
```

---

## Advanced Features

### Message History

Retrieve historical messages from a channel:

```typescript
async getMessages(
  channelName: string,
  options?: { limit?: number; before?: string }
): Promise<ReceivedMessage[]>
```

**Example:**

```javascript
// Get last 50 messages
const messages = await dred.getMessages("game-room-42", { limit: 50 });

messages.forEach(msg => {
  console.log(msg.type, msg.msg);
});
```

### Channel Bookmarks

Resume from a specific message position:

```typescript
async subscribeWithBookmark(
  channelName: string,
  callback: MessageCallback,
  bookmark?: string
): Promise<string>
```

**Example:**

```javascript
// Save bookmark
let currentBookmark = null;

const newBookmark = await dred.subscribeWithBookmark(
  "game-room-42",
  (message) => {
    console.log(message);
    // Bookmark is updated automatically
  },
  currentBookmark
);

// Store the bookmark for later resume
currentBookmark = newBookmark;
```

---

## Complete Example

Here's a complete example of a simple chat application:

```javascript
import { DredClient } from '@cardano-after-dark/dred-client';

// Initialize client
const dred = new DredClient({
  neighborhood: "chat-app",
  waitFor: "minimum"
});

// Connect to network
await dred.connect();

// Join a chat room
const roomName = "general";
await dred.joinChannel(roomName);

// Subscribe to messages
dred.subscribe(roomName, (message) => {
  if (message.type === "chat") {
    displayMessage(message.msg.user, message.msg.text);
  }
});

// Send a message
async function sendChatMessage(user, text) {
  await dred.postMessage(roomName, {
    type: "chat",
    msg: { user, text }
  });
}

// Handle user input
document.getElementById('send-btn').addEventListener('click', async () => {
  const text = document.getElementById('message-input').value;
  await sendChatMessage("Alice", text);
  document.getElementById('message-input').value = '';
});
```

---

## TypeScript Support

The DRED client library is written in TypeScript and includes full type definitions.

```typescript
import { DredClient, DredMessage, ReceivedMessage } from '@cardano-after-dark/dred-client';

const dred: DredClient = new DredClient({
  neighborhood: "my-app"
});

const message: DredMessage = {
  type: "custom-event",
  msg: { data: "value" }
};

await dred.postMessage("my-channel", message);
```

---

## Error Handling

Handle errors gracefully:

```javascript
try {
  await dred.connect();
} catch (error) {
  console.error("Failed to connect:", error);
}

try {
  await dred.postMessage("my-channel", {
    type: "test",
    msg: "Hello"
  });
} catch (error) {
  console.error("Failed to send message:", error);
}
```

---

## Best Practices

1. **Connect Once** - Reuse the same `DredClient` instance throughout your application
2. **Handle Reconnection** - The client automatically reconnects; listen for connection events
3. **Clean Up** - Call `disconnect()` when your application unmounts or closes
4. **Message Sizing** - Keep messages small (under 10KB recommended)
5. **Channel Naming** - Use descriptive, unique names for channels
6. **Error Handling** - Always wrap DRED operations in try-catch blocks

---

## Further Reading

- [Understanding DRED](understanding-dred) - Learn how DRED works
- [Architecture Guide](architecture-guide) - Explore the technical architecture
- [GitHub Repository](https://github.com/Cardano-After-Dark/dred) - View source code and examples
