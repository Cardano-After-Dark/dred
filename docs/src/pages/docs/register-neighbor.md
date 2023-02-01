---
title: Registering a neighbor host
description: Contributing to the Dred messaging network
---

Operate a Dred neighborhood server to contribute to the capacity of the Dred messaging network

---

First off, [get your node running](/docs/node-operations) and verify you can connect to it from the sample application.

## Join a Neighborhood

Work with an org operating an existing Dred neighborhood to get started contributing to their network.  That might involve attending their community meetings and purchasing and/or staking ADA or their community token.

### Updating your serving configuration

Once you have established a trust relationship with other operators in the same Dred network, or satisfied their criteria, just add their neighborhood name to your server configuration:

```js
export default {
  serverId: 'xyzabc1234',
  neighborhoods: ['cardano-after-dark'],
  trustedWalletPubkeys: ["walletPubkey...", ...]
}
```

Restart your server and verify that its Connection Manager reflects healthy connections to its neighbors.  Once that's done, you can submit a decentralized serving host registration record via our hosted UI.


---

## Anything else

More content here TBD

