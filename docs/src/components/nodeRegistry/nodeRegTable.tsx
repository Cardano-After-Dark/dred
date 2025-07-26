import { bytesToText, FoundDatumUtxo } from "@donecollectively/stellar-contracts";
import type { ErgoNodeRegistrationData } from "dred-network-registry";

interface NodeListProps {
    nodeRegistryData: FoundDatumUtxo<ErgoNodeRegistrationData, unknown>[];
    memberTokenFilter?: string; // Optional filter for specific member token
    editNode?: (event: React.MouseEvent<HTMLTableRowElement>) => void;
}

// Helper function to check if a node is active based on its last heartbeat
const isNodeActive = (lastHeartbeat: number, heartbeatInterval: bigint): boolean => {
  const now = Date.now();
  const maxAge = Number(heartbeatInterval);
  return (now - lastHeartbeat) <= maxAge;
};

export function NodeRegTable({ 
    nodeRegistryData, 
    memberTokenFilter,
    editNode
}: NodeListProps) {
    // Filter data by memberToken if filter is provided
    const filteredData = memberTokenFilter 
        ? nodeRegistryData.filter(node => node.data?.memberToken === memberTokenFilter)
        : nodeRegistryData;

    if (filteredData.length === 0) {
        const emptyMessage = memberTokenFilter 
            ? `No nodes registered for member token: ${memberTokenFilter}`
            : "No nodes registered yet.";
            
        return (
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 text-center">
                <p className="text-gray-500 dark:text-slate-400">{emptyMessage}</p>
            </div>
        );
    }

    const stateName = Object.keys(filteredData[0].data!.state)[0];
    
    // Hide Member Token column when filtering by memberToken
    const showMemberToken = !memberTokenFilter;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                <thead className="bg-gray-50 dark:bg-slate-800">
                    <tr>
                        {showMemberToken && (
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                                Member Token
                            </th>
                        )}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-200 uppercase tracking-wider">
                            Node Address
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-500 uppercase tracking-wider">
                            Port
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-200 uppercase tracking-wider">
                            Status / Heartbeat
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.map((nodeUtxo, index) => {
                        // const isActive = isNodeActive(node.lastHeartbeat, heartbeatIntervalSignal.value);
                        const node = nodeUtxo.data!;
                        return (
                            <tr key={`${node.memberToken}-${node.id}`} data-id={bytesToText(node.id)}
                                {... editNode ? {onClick:editNode} : {}}
                                className={`cursor-pointer  text-slate-900 dark:text-slate-200 ${
                                    index % 2 === 0 ? "bg-white dark:bg-slate-700" : "bg-slate-100 dark:bg-slate-800"
                                } hover:!bg-[#1e244c]`}>
                                {showMemberToken && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {node.memberToken}
                                    </td>
                                )}
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {node.nodeDetails.address}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {node.nodeDetails.port.toString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {stateName}
                                    {node.state.Active ? " / " +new Date(Number(node.state.Active)).toLocaleString() : ""}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
