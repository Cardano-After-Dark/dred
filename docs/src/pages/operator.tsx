"use client"

import { useSignal, useComputed, useSignalEffect } from "@preact/signals-react";
import { useEffect, useState } from "react";
import { signals, updaters } from "@/capoSignals.js";
import type { 
    FoundDatumUtxo, AnyDataTemplate, CharterData 
} from "@donecollectively/stellar-contracts";
import type { TxInput } from "@helios-lang/ledger";

import { ErgoNodeRegistrationData, ErgoProtocolSettings } from "dred-network-registry";
import { NodeRegTable } from "@/components/nodeRegistry/nodeRegTable.tsx";
import { NodeRegEditor } from "@/components/nodeRegistry/nodeRegForm.tsx";

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
    const [showEditor, setShowEditor] = useState<boolean>(false);

    // Get current user's member token for filtering
    const userMemberToken = useComputed(() => {
        const userInfo = signals.userInfo.value;
        return userInfo?.memberUut?.name;
    });

    // Define fetchNodeRegistry function outside useSignalEffect so it can be reused
    const fetchNodeRegistry = async () => {
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

    // Effect to fetch node registry data when provider changes
  useSignalEffect(() => {
    fetchNodeRegistry();
    
    // Set up periodic refresh every 5 minutes
    const refreshInterval = setInterval(fetchNodeRegistry, 5 * 60 * 1000);
    return () => clearInterval(refreshInterval);
  });

  const handleRefresh = () => {
    // Refresh the node registry data
    fetchNodeRegistry();
  };

  const handleSave = () => {
    // Close editor and refresh data
    setShowEditor(false);
    handleRefresh();
  };

  const handleClose = () => {
    // Just close the editor
    setShowEditor(false);
  };

  const handleRegisterNewNode = () => {
    console.log("handleRegisterNewNode called, current showEditor.value:", showEditor);
    setShowEditor(true);
    console.log("showEditor.value set to:", showEditor);
  };

const form = showEditor ? <NodeRegEditor
        create={true}
        refresh={handleRefresh}
        onSave={handleSave}
        onClose={handleClose}
      /> : null

    //   console.log("Rendering OperatorPage, showEditor.value:", showEditor, "form:", !!form);
  return (
    <div className="container mx-auto px-4">
      {/* <div style={{backgroundColor: 'yellow', padding: '10px', margin: '10px'}}>
        DEBUG: showEditor = {showEditor ? "true" : "false"}
      </div> */}
      {/* Header with title and register button */}
      {form || <div className="flex justify-end items-center mb-4 -mt-14">
        <button
          onClick={handleRegisterNewNode}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Register New Node
        </button>
      </div>}
      {form && <hr className="my-4"/>}

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
