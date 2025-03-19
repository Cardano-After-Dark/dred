import React from "react"
import {
    CapoDAppProvider,
    UserActionMap,
} from "@donecollectively/stellar-contracts/ui"
import { DredCapo } from "dred-network-registry"
import {
    updateNetwork,
    updateWalletHandle,
    updateProvider,
    updateDAppStatus,
    updateUserInfo,
    addFailedTxn,
} from "../capoSignals.js"

export class DredCapoProviderRaw extends CapoDAppProvider<
    DredCapo & any,
    UserActionMap<"ourActivity1">
> {}

interface DredCapoProviderProps {
    children: React.ReactNode
    bfPreprodKey?: string
}

const bfPreprodKey = process.env.NEXT_PUBLIC_BF_API_KEY ?? ""

export function DredCapoProvider({
    children,
    bfPreprodKey: propKey,
}: DredCapoProviderProps) {
    const apiKey = propKey ?? bfPreprodKey

    return (
        <DredCapoProviderRaw
            targetNetwork="preprod"
            blockfrostKey={apiKey}
            capoClass={DredCapo}
            dAppName="Dred Operator Network"
            onNetwork={updateNetwork}
            onWalletChange={updateWalletHandle}
            onSubmitError={addFailedTxn}
            onStatusChange={updateDAppStatus}
            onUserInfo={updateUserInfo}
            onContextChange={updateProvider}
        >
            {children as any}
        </DredCapoProviderRaw>
    )
}
