# About Dred
The Dred project was inspired by the need for the Poker dApp to have a shared communication channel, transmitting messages between multiple participants in a shared channel to support the poker game.  In the poker game, as with many other cases of multi-user behaviors, a shared message channel enables a set of participants to have a shared stream of updates, to which any [authorized] player can add their content.

Dred provides a realtime shared-message channel capability for dApps, served in a decentralized manner by a number of servers.  Applications using the provided Dred client library can easily connect to the contributing server cluster, and subsets of users in those applications can start sharing private realtime messaging.  Application developers need not operate any messaging servers, and the protocol ensure that operating servers are solely responsible for relaying opaque messages to the participants in the protocol.

## Message Protocol summary

The Dred message protocol is intentionally simple and easy to understand; it uses HTTP with simple streaming (chunked) responses for server-to-client communication.  Messages sent from one channel member are immediately forwarded to all the other channel members.

For client-to-server message delivery, it is compatible with HTTP/2 and HTTP/3 connections (for sending through a pre-existing connection), while maintaining a simple one-message/one-connection mental model (`POST /channel/:id/ \n\n { message: <JSON> }`).  

A Dred client library (or direct access to Dred) could be written in any language, given developer knowledge of HTTP, JSON, a basic crypto library, and access to a chain-indexing server for discovering servers that may be registered to serve their application.  The `dred-client` Typescript library provides a reference implementation, while also providing a turnkey interface for Javascript and Typescript developers to start adding multi-user realtime message-channel capabilities to their dApps.

As a result, client-app developers can easily build real-time messaging functions either directly for end-users (e.g. chat use-cases) or as a primitive for higher-level multi-user use-cases benefiting from shared state.

## Compared to WebRTC
For the poker game, WebRTC and its data-channels feature was also considered, with the acknowledged caveat that one or more coordination servers (STUN and TURN for message relaying) would be needed to ensure connectivity between clients having one or more intervening firewalls.  

By establishing instead a simple dedicated HTTP-based message protocol served by a distributed set of lightweight nodes contributing to the hosting and relaying, clients will trivially connect to a shared event stream, without knowledge or operation of abstruse STUN/TURN protocols and coordination servers.  

Because the Dred network is decentralized, message delivery can be more reliable in the case of partial network-connectivity problems, and the network will tend to receive messages naturally through alternate node/node connections.  

## Functional and Operational Protocol

### Functional layers
The messaging protocol is built in three essential layers: message storage and relaying (Redis and node.js), message-encryption atop the basic messaging capabilities to provide a secure shared channel, and on-chain mechanisms for server registration.  The nodes supporting the channel are expected to collaborate, relaying messages to each other.  

Although the relayed messages are expected to have a clear-text component (for server-to-server coordination & relay-signalling metadata), these messages are expected to also contain encrypted payloads. 

The encryption layer then enables the client library and/or applications to share signalling details that are opaque to the hosting servers; these details can be used by the application to hold neighborhood servers to account for performance problems, reliability problems, failure to relay messages or to do so in a timely manner.  

Meanwhile, the encrypted payloads are also expected to contain content directly relevant to user-facing functions of the applications.
### User/Programmer layer
dApps wanting realtime collaboration for transactions or any case of user-to-user state-sharing can follow simple sequences with options to give the flexibility useful for their application:

  * discover "neighborhood" servers, known to provide messaging services for your application, and connect to them without bothering the person looking at their browser loading your app.
  * join automatically to multiple neighborhood servers.
  * create, list and join channels; present these in your application any way you prefer to dream up.
  * subscribe to notifications for new events in any channel(s); the notification triggers your event-listening callback.

Developers are welcome check our sample application to see a way to use state-machines for a high-reliability UI and to get a sense of the programmatic flow in connecting to the Dred network.  This sample app drives through a process that reveals each step in the Dred network protocol.  A version of this state machine would be a great building-block for the next version of `DredClient.ts`.

### Operational Model
Operationally, each node may serve one or more "neighborhoods", where each neighborhood may represent a specific app; all the servers registered within that neighborhood are expected to replicate to each other (see more about the Relay protocol below).  Each neighborhood would likely be comprised of many message-channels (for many different subsets of users on that application).  

In order to give decentralization and operational redundancy, a relay protocol is defined, giving each node the responsibility to replicate messages it receives to other nodes that have not yet received the message, while skipping retransmission of those messages to nodes that are already known to have the messages.  This low-redundancy smart gossip protocol offers assurance of message delivery while minimizing bandwidth waste that would be implicit in an naively aggressive fire-and-forget gossip approach.  

One outcome of this approach is that end-user client software can connect to perhaps 2-3 of the registered servers for an application and have assurance that if even one of those servers is functioning accurately, that they'll get reliable message delivery - even if their collaborators are connected to a different subset of the nodes in that neighborhood.  Other performance benefits are expected as well.  Developers leveraging the TypeScript library will easily get these results automatically and without need to implement any of the details

#### Performance Expectations

As an additional benefit of the decentralized operational model, performance characteristics are expected to be very strong: clients on a sufficiently-resourced neighborhood should expect highly reliable message delivery, with good latency characteristics.

A simple statistical analysis shows that as the neighborhood gains 3 nodes and beyond, the probability of message loss drops asymptotically to zero, while the maximum message delay is reduced to a function of the sum of minimum-latencies on the shortest path between two clients, where the path is determined by the neighborhood nodes having healthy cross-links.

These operational metrics are expected to improve in direct relationship to the number of nodes actively contributing in the neighborhood, though possibly having a U-shaped response curve with returns diminishing if the product of message-volume and number of contributing nodes rises to a level causing resource-contention for a particular node.  

In such a case, that particular node may become dysfunctional, while clients would be unaffected - as long as they are connected to at least one node not unduly affected by the bottleneck.  The lowest-resource nodes (in terms of network bandwidth, memory and CPU capacity) in a neighborhood would be expected to be affected first.

#### Scaling

By applying Redis as a shared-memory store, with RPC-like performance and a data-streaming model that lets every client receive very-low-latency notification of new content, there is a natural affinity for vertical scalability that is not very common among other operational data stores (e.g. sql or nosql databases); with the caveat that only specific kinds of data sharing would be a good match for the capabilities (don't treat Dred like a SQL DB : ).  Realtime messaging is a great fit.

If needed, an application can scale itself horizontally, by partitioning itself into multiple neighborhoods.  Also, a neighborhood node can scale itself horizontally by operating additional instances of the Dred Server (node.js), connected to a shared Redis instance; a network node operator may also benefit (and be able to serve more application neighborhoods with greater reliability) if they have expertise in operation of Redis cluster and Redis replication techniques

Message channels are currently contemplated as being ephemeral in nature, created at need and expiring after a maximum lifetime, after a maximum idle-timeout, or both.  Future work may employ some non-Redis persistence mechanism to support persistence and/or extended-lifetime message channels, while continuing to leverage Redis for low-latency message propagation.  TBD: Node operators should be able to opt in to protocol parameters within certain boundaries, in order to self-manage the resources and balance the service-level they provide to their served neighborhoods.

### Creating a Dred Neighborhood
Creation of a Dred neighborhood is expected to involve a simple chunk of metadata posted in a transaction on-chain, following a defined convention indicating details about that neighborhood (for instance, its name and a URL for its UI application).  The operational details of initial neighborhood registration, including a possible tokenization smart-contract protocol, are still TBD.

#### Adding a server to a Neighborhood
Given a Neighborhood has been created, the adding of a server to that neighborhood is expected to involve a simple chunk of metadata, following a defined convention that indicates sufficient details about that server (such as its IP address or DNS name), so that it can be used in service-discovery.  A v0.5 or bootstrapping-phase version of this metadata may be complete without further details or validation.  

As the Dred protocol is further developed, it is likely that a smart-contract will need to be involved, enforcing such details as...

  * Token-holding requirements for node-operators
  * DID for server operator (for rev-share distributions)
  * Server key(s) registered
  * Proof of secure connectivity (SSL/TLS encryption with valid cert)
  * Proof of protocol-compliance