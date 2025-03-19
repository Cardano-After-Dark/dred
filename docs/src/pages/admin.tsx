import { useSignal, useComputed, useSignalEffect } from "@preact/signals-react";
import { useEffect } from "react";
import { signals, updaters } from "../capoSignals.js";
import type { 
    FoundDatumUtxo, AnyDataTemplate, CharterData 
} from "@donecollectively/stellar-contracts";
import type { TxInput } from "@helios-lang/ledger";
import type { NodeRegistrationData, ErgoProtocolSettings } from "dred-network-registry";
import { CharterStatus } from "@donecollectively/stellar-contracts/ui";

// Helper function to check if a node is active based on its last heartbeat
const isNodeActive = (lastHeartbeat: number, heartbeatInterval: bigint): boolean => {
  const now = Date.now();
  const maxAge = Number(heartbeatInterval);
  return (now - lastHeartbeat) <= maxAge;
};


export function AdminPage() {
    const lastUpdate = useSignal<Date>(new Date());
    const nodeRegistryData = useSignal<NodeRegistrationData[]>([]);
    const settingsDetail = useSignal<ErgoProtocolSettings | undefined>(undefined);

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

    <div className="container mx-auto px-4 py-8">
      <CharterStatus />

      <h1 className="text-3xl font-bold mb-6">DRED Node Registry Administration</h1>
      
      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Total Nodes</h3>
          <p className="text-2xl">{nodeRegistryData.value.length}</p>
        </div>
        {/* <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Active Nodes</h3>
          <p className="text-2xl">{activeNodes.value}</p>
        </div> */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Last Updated</h3>
          <p className="text-sm">{lastUpdate.value.toLocaleString()}</p>
        </div>
      </div>

      {/* Node Registry Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Member Token
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Node Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Port
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Heartbeat
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {nodeRegistryData.value.map((node, index) => {
            //   const isActive = isNodeActive(node.lastHeartbeat, heartbeatIntervalSignal.value);
              return (
                <tr key={`${node.memberToken}-${index}`} 
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {node.memberToken}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {node.nodeAddress}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {node.nodePort.toString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(Number(node.lastHeartbeat)).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">?active/inactive?
                    {/* <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${isActive ? 'bg-green-100 text-green-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {isActive ? 'active' : 'inactive'}
                    </span> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPage;
