import {
    ConnectionState,
    ConnectionThresholds,
    Peer,
    PeerDiscoveryOptions,
    Peers,
    PromisedPeers,
    ThresholdChoice,
} from "src/peers/PeerDiscovery";


export abstract class PeerConnectionManager<T extends Peer<any>> {
    abstract discoverPeers(): PromisedPeers<T>;
    abstract getThresholds(): Promise<ConnectionThresholds>;

    state: ConnectionState = "pending";

    private peerCache?: Peers<T>;
    constructor(protected options: PeerDiscoveryOptions) {}
    async getPeers(): PromisedPeers<T> {
        if (this.peerCache) return this.peerCache;
        return (this.peerCache = await this._discover());
    }
    async _discover(): PromisedPeers<T> {
        this.state = "discovering";
        return this.discoverPeers();
    }

    async checkConnectionState(
        inCache: Peers<T> = this.peerCache || []
    ): Promise<ConnectionState> {
        //! it check all the peers for connectoin health
        let healthyConnectionCount = 0;
        const state = this.state;

        //!!! it works asynchronously to answer as quickly as feasible.
        // const pendingChecks: Promise[] = [];

        for (const p of inCache) {
            if (p.isConnected) {
                //!!! it actively checks connection health
                healthyConnectionCount += 1;
                continue;
            }
            //!!! TODO: it detects connection-timeouts

            //!!! TODO: it reconnects for any connections that are not healthy

            //! it does not count an in-progress connection as healthy
            if (p.isConnecting) continue;
        }
        const thresholds = await this.getThresholds();

        //! it doesn't wait for pending connections if there are enough to meet
        //   the 'healthy' threshold.
        if (healthyConnectionCount >= thresholds.healthy) {
            return (this.state = "connected");
        }

        //!!! todo: it doesn't wait for pending connections while still doing initial setup

        //!!! todo: if there are any pending connections/reconnections,
        //     it waits at most 5 seconds for them to complete
        if (0 == healthyConnectionCount) {
            if (this.state == "connecting") {
                return this.state;
            } else if (this.state == "discovering") {
                return this.state;
            } else {
                console.warn(
                    `Connection manager disconnected (was in '${this.state}' state)`
                );
                throw new Error(`disconnected`);
                this.state = "disconnected";
            }
        }

        if (healthyConnectionCount < thresholds.minimal) {
            return (this.state = "underconnected");
        }
        if (healthyConnectionCount >= thresholds.minimal) {
            return (this.state = "minimally connected");
        }
        throw new Error(
            `Connection Manager: checkConnectionState: unmatched case: ` +
                JSON.stringify({
                    state,
                    healthyConnectionCount,
                    thresholds,
                    // pendingChecks,
                })
        );
    }

    async freshenPeers(): PromisedPeers<T> {
        this.state = "refreshing";
        const newCache = await this.discoverPeers();
        if (newCache === this.peerCache) {
            throw new Error(
                `discoverPeers returned the existing perCache; it must return a new Peer list`
            );
        }
        let i = 0;
        for (let p of newCache) {
            const match = this.peerCache?.find((cachedPeer) =>
                cachedPeer.eq(p)
            );
            if (match) {
                p = newCache[i] = match;
            }
            if (!p.isConnected || p.isConnecting)
                p.connect().then(
                    this.checkConnectionState.bind(this, newCache)
                );
        }
        return (this.peerCache = newCache);
    }
    newState(cs: ConnectionState) {
        this.state = cs;

        //!!! add eventListener and notify those listeners.
        // this.notify(cs);
    }

    async connectToPeers(
        waitFor: ThresholdChoice,
        timeoutMs: Number
    ): PromisedPeers<T> {
        const promises: Array<Promise<Peer<T>>> = [];
        const done: Peers<T> = [];
        const peers = await this.getPeers();
        const thrs = await this.getThresholds();

        let startTime = new Date().getTime(),
            resolver: Function,
            rejecter: Function,
            resolved: Boolean,
            rejected: Boolean,
            seenErrors: Error[],
            successCount = 0,
            rejectCount = 0;

        function resolveMe(result) {
            if (resolved || rejected) return;
            resolved = true;
            resolver(result);
        }
        function rejectMe(error) {
            if (resolved || rejected) return;
            rejected = true;
            rejecter(error);
        }

        const checkPartialSuccess = () => {
            //! it resolves immediately when enough successes have accumulated,
            //   compared to the requested 'waitFor' threshold.
            if (done.length >= thrs[waitFor]) {
                console.log("connected to peers", done.length);

                resolveMe(peers);
            }

            //! it throws an error if it can't connect to enough peers
            if (peers.length - rejectCount < thrs.minimal) {
                console.error("Error connecting to enough peers");
                if (successCount) {
                    this.newState("underconnected");
                    const msg = `Connected to only ${successCount} peers, out of ${thrs.minimal} needed for convergence`;
                    console.error(msg);
                    //!!! todo: consider: in development, we should fake a cycle through all possible states
                    rejectMe(
                        new Error(msg, {
                            cause: {
                                partial: true,
                                "?developer?": {
                                    note: "more peers can connect later, and any reconnecting peers may result in a later improvement",
                                    guidance:
                                        "don't let the user think everything is fine and dandy!  Not having enough connectivity for convergence means YOU DON'T KNOW THE STATE OF THE CHANNEL!",
                                },
                                seenErrors,
                                recommendation:
                                    "Warn the user with this error.message, and use a read-only UI until decentralization score improves",
                                suggestion:
                                    "consider rendering any locally-cached data if possible and use a read-only or offline state in your user-experience",
                            },
                        })
                    );
                } else if (this.state == "connecting") {
                    const msg = `Not connected to any peers`;
                    console.error(msg);
                    this.newState("disconnected");
                }
                //!!! todo: make the following details available under this.getMoreInfo
                //     and this.developerGuidance
                const msg = `Can't connect to any peers. ${thrs.minimal} are needed for convergence`;
                console.error(msg);
                rejectMe(
                    new Error(msg, {
                        cause: {
                            partial: false,
                            note: "Reconnecting peers may result in a later improvement",
                            guidance:
                                //!!! guides developer to use reconnect() or its final and correct name
                                " wait for retries to succeed, or use reconnect()",
                            seenErrors,
                            recommendation:
                                "Emit this error.message into your UI, and keep monitoring for continuing state changes",
                            suggestion:
                                "consider rendering any locally-cached data if possible and use a read-only or offline state",
                        },
                    })
                );
            }

            const now = new Date().getTime();
            if (now - startTime > timeoutMs) {
                //! resolves successfully if it can connect to at least the minimal number of peers
                //   after waiting for the timeout, even if waitFor: "healthy" is specified.
                if (successCount > thrs.minimal) {
                    resolveMe(peers);
                }
            }
        };

        const myPromise = new Promise((res, rej) => {
            (resolver = res), (rejecter = rej);
        }) as PromisedPeers<T>;
        for (const p of peers) {
            let retries = 0;
            let myLastError: Error;
            const pp = this.tryOneConnection(p).then(
                () => {
                    console.log("connected to peer", p);
                    if (resolved) return;

                    successCount += 1;
                    done.push(p);
                    checkPartialSuccess();
                },
                (error) => {
                    rejectCount += 1;
                    seenErrors.push(error);
                    myLastError = error;
                    checkPartialSuccess();

                    //! retries any failed connections
                    this.tryOneConnection(p).then(
                        (success) => {
                            console.log("CM: success after retry on peer", p);
                            //! todo: write the real code for this:
                            //   seenErrors.deleteAt(myLastError):
                            rejectCount -= 1;
                            successCount += 1;
                            checkPartialSuccess();
                        },
                        (failure) => {
                            console.log(
                                "CM: giving up after one retry on peer",
                                p
                            );
                            //! for now, it retries each connection only once.
                            //!!! todo: use exponential retry (exponents of 1.27 starting at ~500ms)
                        }
                    );
                }
            );
            promises.push(pp as any);
        }

        return myPromise;
    }

    tryOneConnection(p: Peer<T>): Promise<any> {
        return p.connect();
    }
}
