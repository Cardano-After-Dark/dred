---
title: Deploying the Dred Node Registry
description: Setting up for Success
---

How we roll out a meta-contract with long-term support for the on-chain contract development lifecycle

## Supporting the Software Development Lifecycle, off-chain AND on-chain

Make something work "enough", and (potentially) ship it.  Update it, and ship it again.  That's one of the mantras of the Agile lifestyle.  The lesson: small changes are safer than big ones.

With on-chain software, it's long been a tension that we had to make our software do everything we wanted, audit it to make it perfect (enough), and only then, to deploy.  Modifiying minting policies?  Poppycock!  Updating on-chain logic?  Hogwash!  

### Upgradeable (Almost) Everything

We're using Stellar Contracts to create a framework for robust on-chain managment of the on-chain software development lifecycle.  We'll post more about how it makes that possible, under separate cover.

### Dred Node registry: Deployment

We use a two-phase deployment sequence.  In the bootstrap phase, we establish the most essential data structures, scripts, and on-chain utxos to enable the use of the Capo's on-chain lifecycle management.  And in the Deployment phase, we execute lifecycle transactions to deploy two data-controller scripts, enabling protocol Settings and Dred Node Registry records to be created, validated and governed on-chain.

#### Capo Bootstrapping (Phase 1)

- creates a minting script, and posts it as a refScript, stored in the Capo address as a `RefScript` datum
- includes the Capo script, which handles lifecycle administration (for smart contract script creation and upgrades) - also with a RefScript, of course.
- mints a `charter` token, stored as a `Charter` datum in the Capo address.
- creates a "spending delegate" script + refScript
- also mints a `spendDgt-XXXXXX` unique token, stored in the spendingDelegate's script address

#### Script Deployments (Phase 2)

Once the essentials of a Capo have been deployed, with 5 utxos stored in 2 script addresses, we go further:

- Creates a data-controlling script, and a unique token to go with it, stored in that new script address
- Updates the charter with a pointer to the new data-controller (the data it controls will be Dred protocol settings).
- Creates a new Settings record (with a unique token) with Dred protocol settings, and updates the Capo `Charter` utxo to reference that record
- ... and repeats the pattern for deploying scripts that can control other types of data needed for the on-chain Dred Node Registry.

### More to tell

We'll post more about how Stellar Contracts provides the structures of a Capo and how these structures enable high-assurance management of the On-chain Software Development Lifecycle. 


