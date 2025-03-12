
import { MintSpendDelegateBundle } from "@donecollectively/stellar-contracts"
import MintDelegatePolicy from "./MyMintSpendDelegate.hl"
import DredCapoBundle from "./DredCapo.hlb.js"

export default class MyMintSpendDelegateBundle 
extends MintSpendDelegateBundle.usingCapoBundleClass(DredCapoBundle) {
    specializedDelegateModule = MintDelegatePolicy
    get delegateName() {
        return "MyMintSpendDelegate"
    }

}
