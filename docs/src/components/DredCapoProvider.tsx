import React from "react"
import {
    CapoDAppProvider,
    UserActionMap,
} from "@donecollectively/stellar-contracts/ui"
import { DredCapo } from "dred-network-registry"
import {
    updaters,
    signals
} from "../capoSignals.ts"

export const CapoSignals = signals
// import { CapoDAppProvider, UserActionMap } from "@/components/ui/CapoDappProvider.tsx"

export class DredCapoProviderRaw extends CapoDAppProvider<
    DredCapo & any,
    UserActionMap<"ourActivity1">
> {

    getStartedMessage() {
        return "Welcome to the Dred Operator Network. Register a staking vault to get started as a node operator or token-holder"
    }
}

interface DredCapoProviderProps {
    children: React.ReactNode
    bfPreprodKey?: string
}

// this isn't worth protecting as a secret becuase it's used in the front-end.
const bfPreprodKey = "preprodwj3I80hV2evfb5pVuPqhcM14pX4kLYJD"

export function DredCapoProvider({
    children,
    bfPreprodKey: propKey,
}: DredCapoProviderProps) {
    const apiKey = propKey ?? bfPreprodKey

    return (
        <DredCapoProviderRaw
            targetNetwork="preprod"
            blockfrostKey={apiKey}
            //@ts-expect-error temporarily
            capoClass={DredCapo}
            hydra={false}
            dAppName="Dred Operator Network"
            onNetwork={updaters.updateNetwork}
            onWalletChange={updaters.updateWalletHandle}
            onSubmitError={updaters.addFailedTxn}
            onStatusChange={updaters.updateDAppStatus}
            onUserInfo={updaters.updateUserInfo}
            onContextChange={updaters.updateProvider}
        >
            {children as any}
        </DredCapoProviderRaw>
    )
}
