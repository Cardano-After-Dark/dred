import {
    ADA,
    CapoTestHelper,
    DefaultCapoTestHelper,
} from "@donecollectively/stellar-contracts/testing";
import type { TestHelperState } from "@donecollectively/stellar-contracts/testing";
import type { MinimalCharterDataArgs } from "@donecollectively/stellar-contracts";
import type { StellarTestContext } from "@donecollectively/stellar-contracts/testing";

import { DredCapo } from "./DredCapo.js";

export let helperState: TestHelperState<DredCapo> = {
    snapshots: {},
} as any;

export class DredTestHelper extends DefaultCapoTestHelper.forCapoClass(DredCapo) {
    get capo(): DredCapo {
        return this.strella;
    }

    get stellarClass() {
        return DredCapo;
    }

    async setupActors() {
        await super.setupActors();
        this.ts("setupActors");

        // Add messaging nodes
        this.addActor("node1", 10_000n * ADA);
        this.addActor("node2", 12_000n * ADA);
        this.addActor("node3", 8_000n * ADA);
        this.addActor("node4", 9_000n * ADA);

        // Add admin actors
        this.addActor("admin1", 20_000n * ADA);
        this.addActor("admin2", 20_000n * ADA);
    }

    // async basicBootstrap(
    //     ...args: Parameters<DefaultCapoTestHelper["bootstrap"]>
    // ) {
    //     return super.bootstrap(...args);
    // }

}

export type DRED_TC = StellarTestContext<DredTestHelper> & {
    helperState: typeof helperState;
    snapshot(this: DRED_TC, snapName: string): void;
    loadSnapshot(this: DRED_TC, snapName: string): void;
    reusableBootstrap(this: DRED_TC): Promise<DredCapo>;
}; 
