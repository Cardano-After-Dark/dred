import { asyncDelay } from "./util/asyncDelay";
import nacl from "tweetnacl";
import util from "tweetnacl-util";
const { encodeUTF8, decodeUTF8, encodeBase64, decodeBase64 } = util;

export type Key = Uint8Array;
export type KeyList = Array<Key>;

export type ExchangeNotifier = (
    p: KeyExchangerDerivationProof
) => Promise<void>;
interface constructorArgs {
    myself: nacl.BoxKeyPair;
    name: string;
    onReady: ExchangeNotifier;
}
export interface KeyExchDerivationEntry {
    offset: number;
    partialPubKey: Uint8Array;
    // partialSecretKey: Uint8Array;
}
// export interface KeyExchangerPrivateDerivationEntry
//     extends KeyExchDerivationEntry {
//     partialSecretKey: Uint8Array;
// }

export type PartialDerivations = Array<KeyExchDerivationEntry>;
// export type RemainingDerivations = Array<KeyExchangerPrivateDerivationEntry>;

export type KeyExchangerDerivationProof = {
    derivation: PartialDerivations;
    // remainingDerivation: RemainingDerivations;
};

export interface KeyExchangerConstructorArgs extends constructorArgs {
    keys: KeyList;
}
export interface StringKeyConstructorArgs extends constructorArgs {
    keys: Array<string>;
}

export class KeyExchanger {
    keys: KeyList;
    _name: string;
    exchangeAtOffset: number = 0;
    myself: nacl.BoxKeyPair;
    myKeyOffset: number;
    seedKey?: nacl.BoxKeyPair;
    onReady: ExchangeNotifier;
    sharedSecret?: Uint8Array;
    partialDerivation?: PartialDerivations;

    //!!! todo: includes a timeout function, possibly with server-side support,
    //     to break out of a deadlock for a client who doesn't complete their step
    //     in the key-exchange sequence

    //!!! todo: consider a simple pre-commitment phase that would preclude
    //     a client from being able to influence the order of their involvement 
    //     in the exchange (e.g. first trade pubkeys, then sign the ordered list of 
    //     keys, then order the signatures and hash them (-> sigsHash), then hash 
    //     each pubkey with the sigs-hash (-> pubKeySigHashN at each N), and
    //     sort the pubKeys on their respective pubKeySigHashN

    constructor(args: KeyExchangerConstructorArgs) {
        this._name = args.name;
        this.keys = [...args.keys].sort((a, b) => a[0] - b[0]);
        this.myself = args.myself;
        this.myKeyOffset = this.keys.findIndex(
            nacl.verify.bind(this, this.myself.publicKey)
        );
        this.onReady = args.onReady;
        this.initialize();
    }

    static fromStringKeys(args: StringKeyConstructorArgs): KeyExchanger {
        const { keys, ...args2 } = args;
        // const k = [...keys].sort(); // new array of same key strings
        return new KeyExchanger({
            keys: keys.map(decodeBase64),
            ...args2,
        });
    }

    async initialize() {
        if (this.myKeyOffset < 2) {
            const theirPosition = 1 - this.myKeyOffset;
            const theirPub = this.keys[theirPosition];
            const partialSharedKey = nacl.box.before(
                theirPub,
                this.myself.secretKey
            );
            const partialKeyPair = (this.seedKey =
                nacl.box.keyPair.fromSecretKey(partialSharedKey));

            // await asyncDelay(1);
            const partialPubKey = partialKeyPair.publicKey;
            const de0 = { offset: 0, partialPubKey };
            const de1 = { offset: 1, partialPubKey };
            this.logDerivation(de1, partialKeyPair.secretKey);

            await this.receiveKeyProgress([de0, de1]);
        }
    }
    async receiveKeyProgress(p: PartialDerivations) {
        debugger;
        const alreadyComputed = !!this.sharedSecret;
        if (alreadyComputed) {
            if (!this.partialDerivation) throw new Error(`this can't happen`);
            const lpi = this.partialDerivation.length - 1;
            const lpd = this.partialDerivation[lpi];
            const npd = p[lpi];
            if (!nacl.verify(lpd.partialPubKey, npd.partialPubKey))
                throw new Error(
                    `key progress should be redundant but failed verification`
                );
            return;
        }
        this.partialDerivation = p;
        if (this.seedKey) {
            // the first 2 keys compute the remainder of key-exchange
            // starting with key 3 (at index/offset 2):
            this.exchangeAtOffset = 2;
        } else {
            this.exchangeAtOffset = this.myKeyOffset;
        }

        this.computeAndVerifyDerivations();

        if (!alreadyComputed) {
            await asyncDelay(1);
            this.notifyKeyProgress();
        }
    }

    computeAndVerifyDerivations() {
        const derivations: Array<KeyExchDerivationEntry> = this
            .partialDerivation as any;

        let intermediateSecret: Key | null = null, intermediatePublic: Key;
        if ("kex3" === this._name) debugger;
        if (this.seedKey) {
            ({ secretKey: intermediateSecret, publicKey: intermediatePublic } =
                this.seedKey);
        } else {
            intermediatePublic =
                derivations[this.exchangeAtOffset - 1].partialPubKey;
        }
        for (let i = this.exchangeAtOffset; i < this.keys.length; i++) {
            let nextPartyPubKey = this.keys[i];
            let computedNextSecret: Key,
                myExchange: Key,
                computedNextKeyPair: nacl.BoxKeyPair;
            if (intermediateSecret) {
                computedNextSecret = nacl.box.before(
                    nextPartyPubKey,
                    intermediateSecret
                );
            } else {
                myExchange = nacl.box.before(
                    intermediatePublic,
                    this.myself.secretKey
                );
                computedNextSecret = myExchange;
            }
            computedNextKeyPair =
                nacl.box.keyPair.fromSecretKey(computedNextSecret);

            //!!! TODO: it hashes the generated shared-secret to ensure its entropy
            //   before using as a secret key.  Deterministically - all participants do the same.

            const de: KeyExchDerivationEntry = {
                offset: i,
                partialPubKey: computedNextKeyPair.publicKey,
                // partialSecretKey  OMITTED
            };
            this.logDerivation(de, computedNextSecret);
            const crossCheckWithDerivation = this.partialDerivation?.[i];
            if (crossCheckWithDerivation) {
                if (
                    !nacl.verify(
                        de.partialPubKey,
                        crossCheckWithDerivation.partialPubKey
                    )
                ) {
                    throw new Error(
                        `mismatched key derivation at index ${i}:\n${JSON.stringify(
                            derivations
                        )}`
                    );
                }
            } else {
                derivations.push(de);
            }

            //! it continues iterating the secret, following the deterministic process
            //!   to find the final composed shared secret.  Any people earlier in the
            //!   key-exchange sequence already computed this, and now we can too!
            intermediateSecret = computedNextSecret;
            intermediatePublic = computedNextKeyPair?.publicKey;
            this.exchangeAtOffset = 1 + i;
        }
        if (!intermediateSecret) throw new Error(`partial derivation didn't work`);
        
        this.sharedSecret = intermediateSecret;
    }
    logDerivation(de: KeyExchDerivationEntry, ns: Key) {
        const i = de.offset;
        // console.log(
        //     `${this._name} - pub ${de.partialPubKey[0]},${de.partialPubKey[1]} @${i}\n` +
        //         " ".repeat(this._name.length) +
        //         `priv ${ns[0]},${ns[1]}`
        // );
    }
    notifyKeyProgress() {
        const { partialDerivation, sharedSecret } = this;
        if (
            1 + (partialDerivation as PartialDerivations).length <
            this.keys.length
        )
            throw new Error(
                `KeyExchanger '${this._name}': this should already have a full derivation record`
            );
        if (!partialDerivation)
            throw new Error(
                `KeyExchanger '${this._name}': can't notifyKeyProgress() until partialDerivation has been computed`
            );
        // if (!remainingDerivation)
        //     throw new Error(
        //         `can't notifyKeyProgress() until remainingDerivation has been computed`
        //     );
        if (!sharedSecret)
            throw new Error(
                `KeyExchanger '${this._name}': can't notifyKeyProgress() until sharedSecret has been computed`
            );
        this.onReady({
            derivation: partialDerivation,
            // remainingDerivation,
        });
    }
}
