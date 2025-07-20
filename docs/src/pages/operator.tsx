"use client"

import { useSignal, useComputed, useSignalEffect } from "@preact/signals-react";
import { useEffect } from "react";
import { signals, updaters } from "@/capoSignals.js";
import type { 
    FoundDatumUtxo, AnyDataTemplate, CharterData 
} from "@donecollectively/stellar-contracts";
import type { TxInput } from "@helios-lang/ledger";

import { ErgoNodeRegistrationData, ErgoProtocolSettings } from "dred-network-registry";
import { NodeRegTable } from "@/components/nodeRegistry/nodeRegTable.tsx";

export const getStaticProps = async () => {
    return { props: {
        pageTitle: "Node Operator",
        title: "DRED Node Operator Home"
    }}
}

export function OperatorPage() {
    const lastUpdate = useSignal<Date>(new Date());
    const nodeRegistryData = useSignal<ErgoNodeRegistrationData[]>([]);
    const settingsDetail = useSignal<ErgoProtocolSettings | undefined>(undefined);

    // Get current user's member token for filtering
    const userMemberToken = useComputed(() => {
        const userInfo = signals.userInfo.value;
        return userInfo?.memberUut?.name;
    });

    // Effect to fetch node registry data when provider changes
  useSignalEffect(() => {
    fetchNodeRegistry();
    
    // Set up periodic refresh every 5 minutes
    const refreshInterval = setInterval(fetchNodeRegistry, 5 * 60 * 1000);
    return () => clearInterval(refreshInterval);

    async function fetchNodeRegistry() {
      const provider = signals.provider.value;
      if (!provider) return;

      const capo = signals.capo.value
        if (!capo) return;
      try {
        // Get protocol settings for heartbeat interval
        const capoUtxos = await capo.findCapoUtxos();
        const charterData = await capo.findCharterData(undefined, { optional: false, capoUtxos})

        if (charterData) {
            // const settingsController = await capo.getSettingsController({ charterData });
            const settings = await capo.findSettingsInfo({
                charterData,
                capoUtxos
            })
          if (settings) {
            const protocolSettings = settings.data
            settingsDetail.value = protocolSettings
          }
        }

        // Get node registry entries
        // const nodeEntries = await capo.findNodeOpVaultEntries();
        // if (nodeEntries) {
        //   const validNodes = nodeEntries
        //     .map((entry: FoundDatumUtxo<AnyDataTemplate<"dredNode", any>, unknown>) => entry.data)
        //     .filter((data: unknown): data is NodeRegistrationData => {
        //       if (!data) return false;
        //       const d = data as Partial<NodeRegistrationData>;
        //       return typeof d.memberToken === 'string' &&
        //         typeof d.nodeAddress === 'string' &&
        //         typeof d.nodePort === 'bigint' &&
        //         typeof d.lastHeartbeat === 'number';
        //     });
        //   nodeRegistryData.value = validNodes;
        // }
        lastUpdate.value = new Date();
      } catch (error) {
        console.error("Failed to fetch node registry:", error);
      }
    };
  });

  return (
    <div className="container mx-auto px-4">
      
      {/* My Nodes Section */}
      <h2 className="text-2xl font-bold mb-4">My Nodes</h2>
      <NodeRegTable 
        nodeRegistryData={nodeRegistryData.value} 
        settingsDetail={settingsDetail.value}
        memberTokenFilter={userMemberToken.value}
      />
      <div className="flex justify-start items-center mb-6 w-full">
      <p className="text-sm text-left text-gray-500">Updated {lastUpdate.value.toLocaleString()}</p>
    </div>
    </div>
);
}

export default OperatorPage;
