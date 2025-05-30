import {
    Activity,
    BasicMintDelegate,
    CapoDelegateBundle,
    UutName,
    type SeedAttrs,
    type isActivity,
    type hasSeed,
} from "@donecollectively/stellar-contracts";
import { STokMintDelegate } from "stellar-tokenomics";

import MyMintSpendDelegateBundle from "./MyMintSpendDelegate.hlb.js";
import MyMintSpendDelegateDataBridge from "./MyMintSpendDelegate.bridge.js";

export class MyMintSpendDelegate extends STokMintDelegate {
    get delegateName() {
        return "MyMintSpendDelegate";
    }
    dataBridgeClass = MyMintSpendDelegateDataBridge;

    scriptBundle(): CapoDelegateBundle {
        return MyMintSpendDelegateBundle.create();
    }

}
