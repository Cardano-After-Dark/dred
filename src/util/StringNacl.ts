// import nacl from "tweetnacl";
// const { sign: slowSyncSign } = nacl;
// const { verify: slowSyncVerify } = slowSyncSign;

import util from "tweetnacl-util";
const { encodeUTF8, decodeUTF8, encodeBase64, decodeBase64 } = util;
import { newKeyPair, sign, verify } from "watsign";

type LoggerType = {
    log: Function;
    warn: Function;
};
export class StringNacl {
    static newKeyPair = newKeyPair;
    identity?: nacl.SignKeyPair;
    logger: LoggerType;
    constructor(keyPair?: nacl.SignKeyPair, logger: LoggerType = console) {
        this.identity = keyPair;
        this.logger = logger;
    }
    async sign(s: string): Promise<string> {
        if (!this.identity)
            throw new Error(`StringNacl: missing keyPair for signing`);
        const buf = decodeUTF8(s);
        const sigBuf = await sign(buf, this.identity.secretKey);
        const sigStr = encodeBase64(sigBuf);
        return sigStr;
    }

    async verifySig(
        s: string,
        sigBase64: string,
        keyBase64: string
    ): Promise<boolean> {
        let strBuf: Uint8Array, sigBuf: Uint8Array, keyBuf: Uint8Array;
        try {
            strBuf = decodeUTF8(s);
        } catch (e: any) {
            this.logger.warn("failure to decode string:", e.message);
            return false;
        }
        try {
            sigBuf = decodeBase64(sigBase64);
        } catch (e: any) {
            this.logger.warn("failure to decode signature:", e.message);
            return false;
        }
        try {
            keyBuf = decodeBase64(keyBase64);
        } catch (e: any) {
            this.logger.warn("failure to decode pubkey:", e.message);
            return false;
        }
        return verify(strBuf, sigBuf, keyBuf);
    }
}
