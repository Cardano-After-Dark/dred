import React from 'react';
import { CapoDAppProvider, UserActionMap } from "@donecollectively/stellar-contracts/ui";
import { DredCapo } from 'dred-network-registry';
import {
  updateNetwork,
  updateWalletHandle,
  updateProvider,
  updateDAppStatus,
  updateUserInfo,
  addFailedTxn
} from './signals/capoSignals'

export class DredCapoProvider extends CapoDAppProvider<
DredCapo & any,
  UserActionMap<"ourActivity1">
> {}

interface DredCapoProviderProps {
  children: React.ReactNode;
  bfPreprodKey?: string;
}

const bfPreprodKey = import.meta.env.VITE_BF_API_KEY ?? ""

export function ProvidesDredCapo({ children, bfPreprodKey: propKey }: DredCapoProviderProps) {
  const apiKey = propKey ?? bfPreprodKey;

  return (
    <DredCapoProvider
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
    </DredCapoProvider> 
  )
}