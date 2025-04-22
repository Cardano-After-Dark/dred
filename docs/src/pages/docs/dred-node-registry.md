# Dred Node Registry

The Dred Node Registry is a core component of the Dred ecosystem that enables decentralized service discovery. Applications using the Dred network rely on this on-chain registry to find available server nodes that can facilitate their communication needs.

## Registry Overview

The Dred Node Registry consists of:

1. **Node Registry** - A list of available server nodes and their details
2. **Neighborhood Registry** - A collection of application-specific "neighborhoods"

Node operators can register their servers to support one or more neighborhoods, allowing applications within those neighborhoods to discover and connect to them automatically.

## Node Registration Data

Each registered node includes the following essential information:

```
NodeRegistrationData {
    nodeOperator: Token       // Token identifying the node operator
    nodeAddress: String       // Server hostname or IP address
    nodePort: Number          // Port where the Dred server listens
    lastHeartbeat: Number     // Timestamp of last activity
    nodePublicKey: Bytes      // Public key for node identity verification
}
```

This data structure is defined within the smart contract and enables applications to locate and authenticate nodes within the network.

## Programmatic Registration Process

To register a node programmatically, follow these steps:

### 1. Initialize the Dred Capo

The `DredCapo` class provides access to the on-chain registry:

```javascript
// Create a new DredCapo instance
const capo = new DredCapo({
  // Configuration parameters
});
```

### 2. Get Node Registry Settings

Fetch current protocol settings to ensure your registration meets requirements:

```javascript
// Retrieve node operator settings
const settings = await capo.findSettingsInformation();
const nodeOperatorSettings = settings.nodeOperatorSettings;

// Check minimum stake and registration fee requirements
const minStake = nodeOperatorSettings.minNodeOperatorStake;
const regFee = nodeOperatorSettings.minRegistrationFee;
```

### 3. Get a Node Registry Controller

```javascript
// Get a controller instance for node registration
const controller = capo.getNodeRegistryController();
```

### 4. Create and Submit Registration Transaction

```javascript
// Prepare node registration data
const nodeData = {
  nodeAddress: "your-server-address.com", // or IP
  nodePort: 8080,
  nodePublicKey: "your-node-public-key"   // Public key for authentication
};

// Create transaction
const tx = await controller.makeTransactionRegisteringNode(nodeData, {
  // Include required assets (registration fee and stake)
});

// Submit the transaction
// This step depends on your wallet integration
```

### 5. Run Your Dred Server

After successful registration:

1. Start your Dred server using the same public key specified in the registration
2. Your node will be discoverable by other nodes within 5-10 minutes
3. Client applications will automatically connect to your node

## Updating Node Information

To update your node registration (e.g., when changing servers):

```javascript
const updatedData = {
  // Updated fields
  nodeAddress: "new-server-address.com"
};

// Create update transaction
const updateTx = await controller.updateNodeRegistration(
  updatedData,
  {
    // Options and member token required
    memberToken: yourMemberToken
  }
);

// Submit the transaction
```

## Smart Contract Requirements

The on-chain registry enforces several requirements:

1. **Unique Registration** - Each node must have a unique registration record
2. **Staking Requirement** - Operators must stake the minimum amount of Dred tokens
3. **Registration Fee** - A fee must be paid when registering a node
4. **Member Token** - Node operators need a member token to register and update nodes

## Integration with Applications

Applications leveraging the Dred network don't need to interact directly with the registry. The Dred Client library handles node discovery automatically:

```javascript
const dred = new DredClient({
  neighborhoodId: "your-app-neighborhood"
});

// Connect to available nodes in the neighborhood
await dred.connect();

// The client automatically discovers and connects to registered nodes
```

## Related Resources

- [Node Operations](/docs/node-operations) - Guide for operating a Dred node
- [Registering a Neighbor](/docs/register-neighbor) - Detailed registration process
- [Understanding Dred](/docs/understanding-dred) - Overview of the Dred network architecture 