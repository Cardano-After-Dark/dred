import { signal, computed, effect } from "@preact/signals-react"
import type { CapoDappStatus, DappUserInfo } from "@donecollectively/stellar-contracts/ui"
import type { DredCapoProviderRaw } from "./components/DredCapoProvider.jsx"
import type { TxDescription } from "@donecollectively/stellar-contracts"
import { CardanoClient, Cip30Wallet } from "@helios-lang/tx-utils"
import { Address, Value } from "@helios-lang/ledger"
import { DredCapo } from "dred-network-registry"


// Core signals
export const coreSignals = {
    network: signal<CardanoClient | undefined>(undefined),
    wallet: signal<Cip30Wallet | undefined>(undefined),
    provider: signal<DredCapoProviderRaw | undefined>(undefined),
    dAppStatus: signal<CapoDappStatus<any> | undefined>(undefined),
    userInfo: signal<DappUserInfo | undefined>(undefined),
    failedTxns: signal<TxDescription<any, "built">[]>([]),

    // userBalance: signal<Value | undefined>(undefined),
    userAddresses: signal<Address[] | undefined>(undefined),
}

// async reactivesignals
effect(() => {
    const userInfo = signals.userInfo.value
    const wallet = userInfo?.wallet
    if (userInfo?.connectingWallet) {
        // signals.userBalance.value=undefined
        coreSignals.userAddresses.value=undefined
    } else if (wallet) {
        wallet.usedAddresses.then(addrs => {
            coreSignals.userAddresses.value = addrs
        });

        // const balance = wallet.usedAddresses[0]?.balance
        // if (balance) {
        //     coreSignals.userBalance.value = balance
        // }
    }
})

// Computed signals
export const computedSignals = {
    userAddress: computed<Address | undefined>(() => {
        const addresses = coreSignals.userAddresses?.value
        return addresses?.[0]
    }),

    capo: computed<DredCapo | undefined>(() => {
        const provider = coreSignals.provider.value
        if (!provider) return undefined
        return provider.capo
    }),

    isConnected: computed(() => {
        return !!coreSignals.userInfo.value?.wallet
    }),

    // userBalance: computed(() => {
    //     const info = signals.userInfo.value
    //     return info?.balance || 0
    // }),

    statusMessage: computed(() => {
        const status = coreSignals.dAppStatus.value
        return status?.message
    }),

    shouldKeepMessage: computed(() => {
        const status = coreSignals.dAppStatus.value
        return status?.keepOnscreen || false
    }),

    messageClearTime: computed(() => {
        const status = coreSignals.dAppStatus.value
        return status?.clearAfter
    }),

    isError: computed(() => {
        const status = coreSignals.dAppStatus.value
        return status?.isError || false
    }),

    moreInstructions: computed(() => {
        const status = coreSignals.dAppStatus.value
        return status?.moreInstructions
    }),

    nextAction: computed(() => {
        const status = coreSignals.dAppStatus.value
        if (!status?.nextAction) return undefined
        return {
            key: status.nextAction.key,
            label: status.nextAction.label,
            trigger: status.nextAction.trigger,
        }
    }),

    progress: computed(() => {
        const status = coreSignals.dAppStatus.value
        if (!status?.progressBar) return null

        return {
            label:
                typeof status.progressBar === "string"
                    ? status.progressBar
                    : undefined,
            percent: status.progressPercent,
            isActive: !!status.progressBar,
        }
    }),

    hasFailedTxns: computed(() => {
        return coreSignals.failedTxns.value.length > 0
    }),

    lastFailedTxn: computed(() => {
        const txns = coreSignals.failedTxns.value
        return txns[txns.length - 1]
    }),
}

export const signals : typeof coreSignals & typeof computedSignals = {
    ...coreSignals,
    ...computedSignals,
}

// Signal updater functions
export const updaters = {
    updateNetwork: (network: any) => {
        coreSignals.network.value = network
    },

    updateWalletHandle: (handle: any) => {
        coreSignals.wallet.value = handle
    },

    updateProvider: (provider: DredCapoProviderRaw | undefined) => {
        coreSignals.provider.value = provider
    },

    updateDAppStatus: (status: CapoDappStatus<any>) => {
        coreSignals.dAppStatus.value = status
    },

    updateUserInfo: (info: any) => {
        coreSignals.userInfo.value = info
    },

    addFailedTxn: (txn: TxDescription<any, "built">) => {
        coreSignals.failedTxns.value = [...coreSignals.failedTxns.value, txn]
    },
}
