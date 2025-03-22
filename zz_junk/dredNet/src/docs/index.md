# Introduction to Dred

Dred is a real-time messaging protocol that's designed specifically for decentralized applications (dApps).
The protocol enables multiple users to have a shared stream of updates, with any authorized player being able to add content.
With Dred, application developers don't have to operate messaging servers themselves - the protocol is served in a decentralized manner by multiple servers.

## Quick Start

Learn how to get Dred set up in your project in under thirty minutes or it's free.

### Dependencies

Before you begin, make sure you have the following installed:

- Docker
- Node.js
- npm
- pnpm

### Basic Configuration

To get started with Dred, you'll need to configure your server. Here's a basic example:

```js
// dredServer.config.js
export default {
    serverId: 'x1b42yum',
    neighborhoods: [
        'cardano-after-dark',
    ],
    listenAddress: "191.168.42.42",
    port: "4242"
}
```

> **Important**: Make sure to replace the serverId, neighborhoods, listenAddress, and port with your own values.
> The serverId should be unique across your network.

## Open Source

This is an open source project. You can have it for free, you can contribute improvements,
and you can try to request information from the developers. Keep in mind it's not guaranteed
you'll get immediate feedback, as OpenSource developers tend to be very busy trying to survive
by means of creating free software projects.

## Getting Help

If you need help setting up Dred or if there are questions regarding Dred please feel free to [contact us](https://forms.gle/B2yaMNDcnHdmDtJH6).

### Join the Community

Dred is currently developed by the core team, any contributions to the project are welcome.
Also if you want to stay up to date, learn or get to know some of the amazing People behind this Project join us at:

- [Twitter](https://twitter.com/cardanafterdark)
- [Discord](https://discord.gg/VwxRdEBwBE)
- [Telegram](https://t.me/CardanoAfterDark) 