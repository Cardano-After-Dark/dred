"use client"

import { useSignal, useComputed, useSignalEffect } from "@preact/signals-react";
import { useEffect } from "react";
import type { 
    FoundDatumUtxo, AnyDataTemplate, CharterData 
} from "@donecollectively/stellar-contracts";

import { CharterStatus } from "@donecollectively/stellar-contracts/ui";
import { dredCapoSignals, ErgoNodeRegistrationData, ErgoProtocolSettings } from "dred-network-registry";
import { NodeRegTable } from "@/components/nodeRegistry/nodeRegTable.tsx";

export const getStaticProps = async () => {
    return { props: {
        pageTitle: "Admin: Dred Node Registry",
        title: "DRED Registry"
    }}
}

export function AdminPage() {
    const lastUpdate = useSignal<Date>(new Date());
    const nodeRegistryData = useSignal<FoundDatumUtxo<ErgoNodeRegistrationData, unknown>[]>([]);
    const settingsDetail = useSignal<ErgoProtocolSettings | undefined>(undefined);

    // Effect to fetch node registry data when provider changes
  useSignalEffect(() => {
    fetchNodeRegistry();
    
    // Set up periodic refresh every 5 minutes
    const refreshInterval = setInterval(fetchNodeRegistry, 5 * 60 * 1000);
    return () => clearInterval(refreshInterval);

    async function fetchNodeRegistry() {
      const provider = dredCapoSignals.provider.value;
      if (!provider) return;

      const capo = dredCapoSignals.capo.value
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
      <CharterStatus />

      <div className="flex justify-end items-center mb-6 -mt-14 w-full">
        <p className="text-sm text-right text-gray-500">Updated<br/>{lastUpdate.value.toLocaleString()}</p>
      </div>
      
      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Total Nodes</h3>
          <p className="text-2xl">{nodeRegistryData.value.length}</p>
        </div>
        {/* <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Active Nodes</h3>
          <p className="text-2xl">{activeNodes.value}</p>
        </div> */}
      </div>

      {/* Node Registry Table */}
      <NodeRegTable 
        nodeRegistryData={nodeRegistryData.value} 
        // settingsDetail={settingsDetail.value} 
      />
    </div>
  );
}

export default AdminPage;
