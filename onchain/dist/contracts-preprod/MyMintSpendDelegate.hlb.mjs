import { makeSTokMintDelegateBundle } from 'stellar-tokenomics';
import { D as DredCapoBundle } from '../DredCapo.hlb.mjs';
import '@donecollectively/stellar-contracts';
import '@helios-lang/compiler-utils';

const DredMintSpendDelegateBundle = class extends makeSTokMintDelegateBundle(
  DredCapoBundle,
  "DredMintSpendDelegate"
) {
  precompiledScriptDetails = {
    singleton: {
      scriptHash: "3207d0299d6c9ddbb1cbc4384ac2621939da3adb1e577b1e85a82b54",
      config: { "rev": "1", "delegateName": "STokMintDelegate", "isMintDelegate": true, "isSpendDelegate": true, "isDgDataPolicy": false, "requiresGovAuthority": true }
    }
  };
  scriptParamsSource = "bundle";
  async loadPrecompiledVariant(variant) {
    const module = await import('dred-network-registry/contracts-preprod/MyMintSpendDelegate.compiled.hlb');
    const foundVariant = module.precompiled[variant];
    if (!foundVariant) {
      throw new Error(`unknown variant: ${variant}`);
    }
    return foundVariant;
  }
  static needsSpecializedDelegateModule = false;
  // MyMintSpendDelegateDataBridge
  get bridgeClassName() {
    return "MyMintSpendDelegateDataBridge";
  }
};

export { DredMintSpendDelegateBundle, DredMintSpendDelegateBundle as default };
//# sourceMappingURL=MyMintSpendDelegate.hlb.mjs.map
