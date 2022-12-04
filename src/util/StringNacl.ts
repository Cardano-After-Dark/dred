import nacl from "tweetnacl";
const { sign } = nacl;
import util from "tweetnacl-util";
const { encodeUTF8, decodeUTF8, encodeBase64, decodeBase64 } = util;

export class StringNacl {
    identity?: nacl.SignKeyPair;
    constructor(keyPair?: nacl.SignKeyPair) {
        this.identity = keyPair;
    }
    sign(s: string): string {
        if (!this.identity)
            throw new Error(`StringNacl: missing keyPair for signing`);
        const buf = decodeUTF8(s);
        const sigBuf = sign.detached(buf, this.identity.secretKey);
        const sigStr = encodeBase64(sigBuf);
        return sigStr;
    }

    verifySig(s: string, sigBase64: string, keyBase64: string): boolean {
        const strBuf = decodeUTF8(s);
        const sigBuf = decodeBase64(sigBase64);
        const keyBuf = decodeBase64(keyBase64);
        const verified = sign.detached.verify(strBuf, sigBuf, keyBuf);
        return verified;
    }
}
