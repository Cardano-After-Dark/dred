import {
    Activity,
    BasicMintDelegate,
    CapoDelegateBundle,
    UutName,
    type SeedAttrs,
    type isActivity,
    type hasSeed,
    DelegatedDataBundle,
    MintSpendDelegateBundle,
    type ConcreteCapoDelegateBundle,
} from "@donecollectively/stellar-contracts";
import { STokMintDelegate } from "stellar-tokenomics";

import MyMintSpendDelegateBundle from "./MyMintSpendDelegate.hlb.js";
import MyMintSpendDelegateDataBridge from "./MyMintSpendDelegate.bridge.js";

/**
 * @public
 */
export class MyMintSpendDelegate extends STokMintDelegate {
    get delegateName() {
        return "MyMintSpendDelegate";
    }
    dataBridgeClass = MyMintSpendDelegateDataBridge;

    async scriptBundleClass() : Promise<ConcreteCapoDelegateBundle> {
        const module = await import("./MyMintSpendDelegate.hlb.js")
        return module.default
    }

}
