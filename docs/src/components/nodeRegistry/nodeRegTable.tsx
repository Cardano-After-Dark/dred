import type { ErgoNodeRegistrationData } from "dred-network-registry";

interface NodeListProps {
    nodeRegistryData: ErgoNodeRegistrationData[];
    settingsDetail?: any; // You can type this more specifically if needed
    memberTokenFilter?: string; // Optional filter for specific member token
}

// Helper function to check if a node is active based on its last heartbeat
const isNodeActive = (lastHeartbeat: number, heartbeatInterval: bigint): boolean => {
  const now = Date.now();
  const maxAge = Number(heartbeatInterval);
  return (now - lastHeartbeat) <= maxAge;
};

export function NodeRegTable({ nodeRegistryData, settingsDetail, memberTokenFilter }: NodeListProps) {
    // Filter data by memberToken if filter is provided
    const filteredData = memberTokenFilter 
        ? nodeRegistryData.filter(node => node.memberToken === memberTokenFilter)
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

    const stateName = Object.keys(filteredData[0].state)[0];
    
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-500 uppercase tracking-wider">
                            Last Heartbeat
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-200 uppercase tracking-wider">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.map((node, index) => {
                        // const isActive = isNodeActive(node.lastHeartbeat, heartbeatIntervalSignal.value);
                        return (
                            <tr key={`${node.memberToken}-${index}`} 
                                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                {showMemberToken && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {node.memberToken}
                                    </td>
                                )}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {node.nodeDetails.address}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {node.nodeDetails.port.toString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {node.state.Active ? new Date(Number(node.state.Active)).toLocaleString() : stateName}
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
    );
}
