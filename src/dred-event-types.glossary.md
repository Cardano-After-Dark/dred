# Project Glossary

Loaded to answer: "I'm about to write something. Is this wording right here?"

Contexts tag every rule below: `dialog` (conversation), `formal` (artifacts, commits, docs), `user-only` (user input only; agent never emits).

What you'll find:
1. What not to write: prohibited forms. Scan this first.
2. Casual abbreviations: non-canonical forms permitted in specified contexts.
3. Canonical terms: the formal spellings to emit.

Each section is a fast-scan table followed by detail entries below, in the same order.

---

## 1. What not to write

No prohibitions recorded.


## 2. Casual abbreviations

No casual abbreviations recorded.


## 3. Canonical terms

| Term | Scope | Line |
|---|---|---|
| chanCreated | `project` | [L52](#term-chancreated) |
| channel:genesis | `project` | [L59](#term-channel-genesis) |
| error | `project` | [L66](#term-error) |
| heartbeat | `project` | [L73](#term-heartbeat) |
| heartbeat-info | `project` | [L80](#term-heartbeat-info) |
| newId | `project` | [L87](#term-newid) |
| warning | `project` | [L94](#term-warning) |



---

# Details

## 1. What not to write — details



## 3. Canonical terms — details


### chanCreated
<a id="term-chancreated"></a>

Definition: Protocol-event broadcast on the _chans meta-channel announcing a newly-created channel.
Scope: `project`


### channel:genesis
<a id="term-channel-genesis"></a>

Definition: Protocol-event inception marker persisted on a channel&#39;s own stream at creation time.
Scope: `project`


### error
<a id="term-error"></a>

Definition: Stream-control notification that a per-channel stream consumer failed.
Scope: `project`


### heartbeat
<a id="term-heartbeat"></a>

Definition: Stream-control liveness ping emitted by the server on each open listen stream.
Scope: `project`


### heartbeat-info
<a id="term-heartbeat-info"></a>

Definition: Stream-control frame sent once after a listen succeeds, carrying the expected heartbeat interval.
Scope: `project`


### newId
<a id="term-newid"></a>

Definition: Planned protocol-event on the _auth meta-channel for identity registration (not yet implemented).
Scope: `project`


### warning
<a id="term-warning"></a>

Definition: Stream-control advisory for a missing or expired channel in a multi-channel subscribe.
Scope: `project`


