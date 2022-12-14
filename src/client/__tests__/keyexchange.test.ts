import { KeyExchanger, KeyExchangerDerivationProof } from "src/KeyExchanger";
import nacl from "tweetnacl";
const { sign } = nacl;
import util from "tweetnacl-util";
const { encodeUTF8, decodeUTF8, encodeBase64, decodeBase64 } = util;

describe("key exchange", () => {
    it("works", async () => {
        // setup on this is awkward; in regular use, a caller would only have
        //    a list of pubKeyBase64 + identity,..
        function toPubKey64(x) {
            return encodeBase64(x.publicKey);
        }
        const keyPairs = [1, 2, 3, 4].map(nacl.box.keyPair);
        // ...but here, we have all the keypairs.

        //  so, we first sort them the same way
        //  that the Kex will do, so we will get a properly-ordered list of Kex
        keyPairs.sort((a, b) => a.publicKey[0] - b.publicKey[0]);

        // this sorts by their base64 pubkeys
        //... then, orders by those pubkeys, so we can know in which order
        //     the key-exchange can be expected to transpire
        const [kp1, kp2, kp3, kp4] = keyPairs;
        const keys = keyPairs.map(toPubKey64);

        let ss1, ss2, ss3, ss4;
        let done, kex4done;
        let startTime = new Date().getTime();
        kex4done = new Promise((res) => (done = res));
        // the last key will have its onReady triggered last
        const kex4 = KeyExchanger.fromStringKeys({
            name: "kex4",

            keys,
            myself: kp4,
            async onReady(p: KeyExchangerDerivationProof) {
                console.log(
                    "kex4 ready (",
                    new Date().getTime() - startTime,
                    "ms )"
                );
                expect(ss1).toBeTruthy();
                expect(ss2).toBeTruthy();
                expect(ss3).toBeTruthy();
                ss4 = kex4.sharedSecret;
                expect(ss4).toBeTruthy();
                expect(nacl.verify(ss1, ss4)).toBeTruthy();
                expect(nacl.verify(ss2, ss4)).toBeTruthy();
                expect(nacl.verify(ss3, ss4)).toBeTruthy();
                done(ss4);
            },
        });
        // await asyncDelay(1);
        const kex3 = KeyExchanger.fromStringKeys({
            name: "kex3",
            keys,
            myself: kp3,
            async onReady(p: KeyExchangerDerivationProof) {
                console.log(
                    "kex3 ready (",
                    new Date().getTime() - startTime,
                    "ms )"
                );
                expect(ss1).toBeTruthy();
                expect(ss2).toBeTruthy();
                ss3 = kex3.sharedSecret;
                expect(ss3).toBeTruthy();
                await kex4.receiveKeyProgress(p.derivation);
                if (!kex4.sharedSecret)
                    throw new Error(`expected kex3 to have a computed secret`);
                expect(nacl.verify(kex4.sharedSecret, ss3)).toBeTruthy();
            },
        });
        // await asyncDelay(1);
        const kex2 = KeyExchanger.fromStringKeys({
            name: "kex2",
            keys,
            myself: kp2,
            async onReady(p: KeyExchangerDerivationProof) {
                // can fail race where #1 and #2 both trigger kex seed.
                // expect(ss1).toBeTruthy();
                console.log(
                    "kex2 ready (",
                    new Date().getTime() - startTime,
                    "ms )"
                );
                ss2 = kex2.sharedSecret;
                expect(ss2).toBeTruthy();
                await kex3.receiveKeyProgress(p.derivation);
                if (!kex3.sharedSecret)
                    throw new Error(`expected kex3 to have a computed secret`);
                expect(nacl.verify(kex3.sharedSecret, ss2)).toBeTruthy();
            },
        });
        // await asyncDelay(1);
        const kex1 = KeyExchanger.fromStringKeys({
            name: "kex1",
            keys,
            myself: kp1,
            async onReady(p: KeyExchangerDerivationProof) {
                ss1 = kex1.sharedSecret;
                console.log(
                    "kex1 ready (",
                    new Date().getTime() - startTime,
                    "ms )"
                );
                expect(ss1).toBeTruthy();
                await kex2.receiveKeyProgress(p.derivation);
                if (!kex2.sharedSecret)
                    throw new Error(`expected kex3 to have a computed secret`);
                expect(nacl.verify(kex2.sharedSecret, ss1)).toBeTruthy();
            },
        });
        console.log("waiting for kex4");
        await expect(kex4done).resolves.toBeTruthy();
        console.log(
            "4x key exchange completed in",
            new Date().getTime() - startTime,
            "milliseconds"
        );
        //redundant checks mostly for clarity:
        if (!ss1) throw new Error(`ss1 expected`);
        if (!ss2) throw new Error(`ss2 expected`);
        if (!ss3) throw new Error(`ss3 expected`);
        if (!ss4) throw new Error(`ss4 expected`);
        expect(nacl.verify(ss1, ss2)).toBeTruthy();
        expect(nacl.verify(ss1, ss3)).toBeTruthy();
        expect(nacl.verify(ss1, ss4)).toBeTruthy();
    });
});
