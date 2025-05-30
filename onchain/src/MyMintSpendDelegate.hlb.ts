import { makeSTokMintDelegateBundle } from "stellar-tokenomics"
import DredCapoBundle from "./DredCapo.hlb.js"

const DredMintSpendDelegateBundle = class extends makeSTokMintDelegateBundle(
    DredCapoBundle, "DredMintSpendDelegate"
) {
    static needsSpecializedDelegateModule = false;
    // MyMintSpendDelegateDataBridge

     get bridgeClassName() {
        return "MyMintSpendDelegateDataBridge";
     }
}

export default DredMintSpendDelegateBundle;