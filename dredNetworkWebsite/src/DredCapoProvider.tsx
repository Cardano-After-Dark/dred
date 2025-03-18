import { CapoDAppProvider, UserActionMap, CapoDappStatus } from "stellar-tokenomics/ui"
import { ReactNode } from 'react'
import { DredCapo as DredTokenomicsCapo } from '../../onchain/src/DredCapo'
import type { TxDescription } from '@donecollectively/stellar-contracts'
import {
  networkSignal,
  walletHandleSignal,
  providerSignal,
  updateNetwork,
  updateWalletHandle,
  updateProvider,
  updateDAppStatus,
  updateUserInfo,
  addFailedTxn
} from './signals/capoSignals'

export class DredCapo extends CapoDAppProvider<
  DredCapo & any,
  UserActionMap<"ourActivity1">
> {}

interface DredCapoProviderProps {
  children: ReactNode;
  bfPreprodKey?: string;
}

const bfPreprodKey = import.meta.env.VITE_BF_API_KEY ?? ""

export function DredCapoProvider({ children, bfPreprodKey: propKey }: DredCapoProviderProps) {
  const apiKey = propKey ?? bfPreprodKey;

  return (
    <DredCapo
      targetNetwork="preprod"
      blockfrostKey={apiKey}
      capoClass={DredTokenomicsCapo}
      dAppName="Dred Operator Network"
      onNetwork={updateNetwork}
      onWalletChange={updateWalletHandle}
      onSubmitError={addFailedTxn}
      onStatusChange={updateDAppStatus}
      onUserInfo={updateUserInfo}
      onContextChange={updateProvider}
    >
      {children}
    </DredCapo> 
  )
}