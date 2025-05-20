---
title: Hydra Compatibility
description: Validating use of smart contracts on L2
---

For our cPoker Hydra Research grant in Catalyst F13, we needed to verify the viability of using a smart contract for locking funds.  Follow our the story of rolling into the era of Cardano's scalability.

## Verifying smart contract functionality on Layer 2

The core purpose of this milestone deliverable is to reduce risk and verify the practical aspects of using an on-chain contract mechanism for locking funds for a poker game.

Having already had a smart contract suite underway for our Dred Onchain Registry, we recognized that deploying those contract scripts to a Hydra channel would be an excellent verification of the vaunted isomorphic characteristics of Hydra.

### **The story so far**

We created a terminal based application that sends transactions across the Hydra channels, and proved how transaction metadata can carry information  from node to node.

This worked very nicely - and by boosting the Hydra channel's maximum transaction-size parameter, were were even able to send much larger messages.  Long string encodings were needed (arrays of <64 byte strings) to meet the encoding expectations - in the same way needed on Cardano's L1.

The way this proof of concept works is based on the arrival of transactions at each Hydra node.  It doesn't rely on snapshotting the Hydra channel at all, although transferring funds between accounts ***does*** require those snapshots.

The Hydra node API pushes those received transactions to any websocket subscribers, so our terminal-based application (in Typescript) was able to read the messages.

### News Flash: **Hydra's Isomorphism is not absolute**

Isomorphic means "same shape".  When it comes to transaction structures, Hydra so far does seem to have that property (we're still getting toward completing the smart contract verification - stay tuned).

However, the Hydra nodes don't seem to present the kinds of interfaces used by wallet software (each wallet can use its own preferred route for UTxO querying and tx submission).  So for now, we took a non-CIP30 approach to interfacing with our Hydra proof of concept environment.

Transactions created with cardano-cli worked great for submission on the Hydra channel, given addresses (with local credentials) having funds successfully committed into the Hydra head.

### **Creating a CardanoClient for Hydra**

With Hydra nodes running on localhost, we collaborated with Christian of the Helios project.  Based on his deep skills and strong codebase, he knocked out a prototype HydraClient class, providing the same `CardanoClient` Interface used by the Helios API's blockfrost provider while acting through the Hydra node's API interface.  

The Helios package includes a `Wallet` interface (and, separately a `Cip30Wallet` interface, which is even more specific), and implements a SimpleWallet that uses cryptographic essentials to provide a programmatic way to trigger transaction signing, no CIP30 wallet required.

### **Putting Together all the Pieces**

We upgraded Stellar Contracts (an advanced dApp-creation framework) using the Helios SimpleWallet and made it possible to interact in the same ways with Stellar Contracts that were previously possible with CIP30 wallets.  For now, we're calling it the Zero Wallet.

We updated the CapoDappProvider react component to support the new wallet selection (which works fine in a non-Hydra environment as well!).  And we added a `hydra={true}` prop, which activates the Hydra Client.

When executing a series of 10 or more transactions for the full Capo setup in Stellar Contracts, we found that the Zero Wallet gave us a beautiful user experience.  Our in-app transaction viewer makes it easy to review the transactions before we collect the "Sign and Submit" signal, and we routinely are seeing 5 or more txns being confirmed in the same timeframe as is typical for single transactions, which makes things feel even faster and easier.

Future work will involve techniques for striking a more defensive pose for security of the Zero Wallet keys, with encryption-at-rest, while retaining a good chunk of the convenience and speed we've enjoyed with Zero Wallet.

### **Snapshots Galore**

The Hydra client uses a `GET /snapshot/utxos` endpoint to locate the active set of UTxOs found in the most recent snapshot on a Hydra channel.

As mentioned above, we hadn't been committing snapshots - so this is the time when we get started with the snapshotting.

All the peers participating in a Hydra head/channel need to be involved in snapshots; otherwise, the L1 head contract won't accept it.

### **The story continues**

... stay tuned!  We're taking snapshots to get with the querying of the Hydra channel, so that the Helios HydraClient can find the UTxOs it needs as seed (and the funds!) for instantiating the Capo smart contracts on the Hydra channel.

## **Review: Dred Node Registry Setup**

Check out our rundown on how deployment of our smart contract suite works.  This powerful mechanism for adopting normal practices of the software development lifecycle supports upgradability for on-chain contracts and much more advanced capabilities than would be possible in smart contracts using monolithic, immutable deployments.

