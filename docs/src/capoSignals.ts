import { signal, computed, effect } from '@preact/signals-react'
import type { CapoDappStatus } from "@donecollectively/stellar-contracts/ui";
import type { DredCapoProviderRaw } from "./components/DredCapoProvider.jsx";
import type { TxDescription } from '@donecollectively/stellar-contracts';

// Core signals
export const networkSignal = signal<any>(undefined);
export const walletHandleSignal = signal<any>(undefined);
export const providerSignal = signal<DredCapoProviderRaw | undefined>(undefined);
export const dAppStatusSignal = signal<CapoDappStatus<any> | undefined>(undefined);
export const userInfoSignal = signal<any>(undefined);
export const failedTxnsSignal = signal<TxDescription<any, "built">[]>([]);

export const capoSignal = computed(() => {
  const provider = providerSignal.value;
  if (!provider) return undefined;
  return provider.capo;
});

// Computed signals for user info
export const isConnectedSignal = computed(() => {
  return !!walletHandleSignal.value;
});

export const userAddressSignal = computed(() => {
  const info = userInfoSignal.value;
  return info?.address || null;
});

export const userBalanceSignal = computed(() => {
  const info = userInfoSignal.value;
  return info?.balance || 0;
});

// Computed signals for dApp status
export const statusMessageSignal = computed(() => {
  const status = dAppStatusSignal.value;
  return status?.message;
});

export const shouldKeepMessageSignal = computed(() => {
  const status = dAppStatusSignal.value;
  return status?.keepOnscreen || false;
});

export const messageClearTimeSignal = computed(() => {
  const status = dAppStatusSignal.value;
  return status?.clearAfter;
});

export const isErrorSignal = computed(() => {
  const status = dAppStatusSignal.value;
  return status?.isError || false;
});

export const moreInstructionsSignal = computed(() => {
  const status = dAppStatusSignal.value;
  return status?.moreInstructions;
});

export const nextActionSignal = computed(() => {
  const status = dAppStatusSignal.value;
  if (!status?.nextAction) return null;
  return {
    key: status.nextAction.key,
    label: status.nextAction.label,
    trigger: status.nextAction.trigger
  };
});

export const progressSignal = computed(() => {
  const status = dAppStatusSignal.value;
  if (!status?.progressBar) return null;
  
  return {
    label: typeof status.progressBar === 'string' ? status.progressBar : undefined,
    percent: status.progressPercent,
    isActive: !!status.progressBar
  };
});

// Computed signal for failed transactions
export const hasFailedTxnsSignal = computed(() => {
  return failedTxnsSignal.value.length > 0;
});

export const lastFailedTxnSignal = computed(() => {
  const txns = failedTxnsSignal.value;
  return txns[txns.length - 1];
});

// Signal updater functions
export const updateNetwork = (network: any) => {
  networkSignal.value = network;
};

export const updateWalletHandle = (handle: any) => {
  walletHandleSignal.value = handle;
};

export const updateProvider = (provider: DredCapoProviderRaw | undefined) => {
  providerSignal.value = provider;
};



export const updateDAppStatus = (status: CapoDappStatus<any>) => {
  dAppStatusSignal.value = status;
};

export const updateUserInfo = (info: any) => {
  userInfoSignal.value = info;
};

export const addFailedTxn = (txn: TxDescription<any, "built">) => {
  failedTxnsSignal.value = [...failedTxnsSignal.value, txn];
}; 