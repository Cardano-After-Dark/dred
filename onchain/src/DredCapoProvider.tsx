import React from "react"
import {
    CapoDAppProvider,
    type UserActionMap,
} from "@donecollectively/stellar-contracts/ui"
import { DredCapo } from "dred-network-registry"
import {
    dredCapoUpdaters,
    dredCapoSignals
} from "./capoSignals.js"

/**
 * component for providing the DredCapo context to the app
 * @remarks
 * dApps shouldn't need to use this component directly.  Instead,
 * use the DredCapoProvider component, and use useCapoDappProvider() 
 * and/or dredCapoSignals to access the state of the DredCapo.
 * @public
 */
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

/**
 * @public
 */
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
            hydra={false}
            dAppName="Dred Operator Network"
            onNetwork={dredCapoUpdaters.updateNetwork}
            onWalletChange={dredCapoUpdaters.updateWalletHandle}
            onSubmitError={dredCapoUpdaters.addFailedTxn}
            onStatusChange={dredCapoUpdaters.updateDAppStatus}
            onUserInfo={dredCapoUpdaters.updateUserInfo}
            onContextChange={dredCapoUpdaters.updateProvider}                        
        >
            {children as any}
        </DredCapoProviderRaw>
    )
}
