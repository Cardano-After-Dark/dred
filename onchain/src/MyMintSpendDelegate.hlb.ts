import { makeSTokMintDelegateBundle } from "stellar-tokenomics"
import DredCapoBundle from "./DredCapo.hlb.js"
import type { ConcreteCapoDelegateBundle } from "@donecollectively/stellar-contracts";

const DredMintSpendDelegateBundle : ConcreteCapoDelegateBundle = class extends makeSTokMintDelegateBundle(
    DredCapoBundle, "DredMintSpendDelegate"
) {
    static needsSpecializedDelegateModule = false;
    // MyMintSpendDelegateDataBridge

     get bridgeClassName() {
        return "MyMintSpendDelegateDataBridge";
     }
}

export default DredMintSpendDelegateBundle;