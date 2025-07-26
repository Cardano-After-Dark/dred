"use client";

import {
  useSignal,
  useComputed,
  useSignalEffect,
  effect,
} from "@preact/signals-react";
import { useEffect, useState } from "react";
import {
  type FoundDatumUtxo,
  type AnyDataTemplate,
  type CharterData,
  bytesToText,
} from "@donecollectively/stellar-contracts";
import { makeAddress, type TxInput } from "@helios-lang/ledger";

import {
  DredCapo,
  ErgoNodeRegistrationData,
  ErgoProtocolSettings,
  NodeRegistrationData,
} from "dred-network-registry";
import { NodeRegTable } from "@/components/nodeRegistry/nodeRegTable.tsx";
import { NodeRegEditor } from "@/components/nodeRegistry/nodeRegForm.tsx";
import { useLiveSignal } from "@preact/signals-react/utils";
import { signals, updaters } from "../capoSignals.js";
import * as FFF from "../capoSignals.js";
import { useCapoDappProvider } from "@donecollectively/stellar-contracts/ui";
import { DredCapoProviderRaw } from "../components/DredCapoProvider.tsx";
export const getStaticProps = async () => {
  return {
    props: {
      pageTitle: "Node Operator",
      title: "Node Operator Home",
    },
  };
};

export function OperatorPage() {
  const lastUpdate = useSignal<Date>(new Date());
  const [mintingMemberToken, setMintingMemberToken] = useState<boolean>(false);
  const nodeRegistryData = useSignal<FoundDatumUtxo<ErgoNodeRegistrationData, unknown>[]>([]);
  const settingsDetail = useSignal<ErgoProtocolSettings | undefined>(undefined);
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [editingNode, setEditingNode] = useState<FoundDatumUtxo<ErgoNodeRegistrationData, unknown> | undefined>(undefined);

  const [gen, bump] = useState(0);
  const userInfo = useLiveSignal(signals.userInfo);
  //@ts-expect-error until we can iron out the types
  const { provider, capo } = useCapoDappProvider<DredCapo>();
  const {
    walletUtxos,
    status,
    status: { ready },
  } = provider.state;

  // Get current user's member token for filtering
  const userMemberToken = useComputed(() => {
    return userInfo.value.value?.memberUut?.name;
  });

  // Define fetchNodeRegistry function outside useSignalEffect so it can be reused
  const fetchNodeRegistry = async () => {
    
    if (!provider) return;

    const capo = provider.capo!;
    if (!capo) return;

    try {
      // Get protocol settings for heartbeat interval
      const capoUtxos = await capo.findCapoUtxos();
      const charterData = await capo.findCharterData(undefined, {
        optional: false,
        capoUtxos,
      });

      if (charterData) {
        // const settingsController = await capo.getSettingsController({ charterData });
        const settings = await capo.findSettingsInfo({
          charterData,
          capoUtxos,
        });
        if (settings) {
          const protocolSettings = settings.data;
          settingsDetail.value = protocolSettings;
        }
      }

    //   Get node registry entries
      const nodeEntries = await capo.findNodeOpEntries({
        capoUtxos,
        charterData,
      });
      
      if (nodeEntries) {
        const validNodes = nodeEntries
        //   .map((entry: FoundDatumUtxo<AnyDataTemplate<"DredNode", any>, unknown>) => entry.data)
          .filter((entry: FoundDatumUtxo<any, unknown>): entry is FoundDatumUtxo<ErgoNodeRegistrationData, unknown> => {
            if (!entry) return false;
            return typeof entry.data.memberToken === 'string' 
              && typeof entry.data.nodeDetails?.address === 'string' 
            // &&   typeof d.nodeDetails?.port === 'bigint' 
            // &&   typeof d.nodeDetails?.pubKeyHash === 'string';
          });
        nodeRegistryData.value = validNodes;
      }
      lastUpdate.value = new Date();
    } catch (error) {
      console.error("Failed to fetch node registry:", error);
    }
  };

  // Effect to fetch node registry data when provider changes
  useEffect(() => {
    fetchNodeRegistry();

    // Set up periodic refresh every 5 minutes
    // const refreshInterval = setInterval(fetchNodeRegistry, 5 * 60 * 1000);
    // return () => clearInterval(refreshInterval);
  }, [provider, ready]);

  //   effect(() => {
  //     if(signals.provider.value) {
  //         console.log(signals.provider.value)
  //     }
  //     bump(gen + 1);
  //   });

  if (!capo) return <div>Loading...</div>;
  if (!userInfo.value) return <div>Loading user info...</div>;
  const address = userInfo.value.value?.walletAddress;

  const handleRefresh = () => {
    // Refresh the node registry data
    fetchNodeRegistry();
  };

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Close editor and refresh data
    event.preventDefault();
    setShowEditor(false);
    handleRefresh();
  };

  const handleClose = () => {
    // Just close the editor
    setShowEditor(false);
    setEditingNode(undefined);
  };

  const editNode = (event: React.MouseEvent<HTMLTableRowElement>) => {
    event.preventDefault();
    const id = event.currentTarget.dataset.id;
    if (!id) return;
    const foundNode = nodeRegistryData.value.find(
        node => bytesToText(node.data!.id) === id
    )
    if (!foundNode) return;

    setShowEditor(true);
    setEditingNode(foundNode);
    console.log("showEditor.value set to:", showEditor);
  };

  const handleRegisterNewNode = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    console.log(
      "handleRegisterNewNode called, current showEditor.value:",
      showEditor,
    );
    setShowEditor(true);
    console.log("showEditor.value set to:", showEditor);
  };

  const mintMemberToken = async () => {
    setMintingMemberToken(true);
    const tcx = await capo.mkTxnMintParticipantToken(
      makeAddress(userInfo.value.value?.walletAddress!),
    );
    console.log("tcx", tcx);
    await tcx.submitAll();
    setMintingMemberToken(false);
  };

  const { foundNetworkName, roles, memberUut, walletAddress } =
    userInfo.value!.value!;
  const showInfo = (
    <pre>
      {JSON.stringify(
        {
          walletUtxos: walletUtxos!.length,
          status,
          foundNetworkName,
          roles,
          memberUut,
          walletAddress,
        },
        (key: string, value: any) => {
          if (typeof value === "bigint") {
            return value.toString();
          }
          return value;
        },
        2,
      )}
    </pre>
  );
  if (!ready) {
    return <><div>waiting for wallet</div>
    {showInfo}
    </>;
  }

  const registerMember =
    //       <p>Minting member token... review the transaction, submit, and sign in your wallet.</p>
    //   </> :
    userInfo.value.value?.roles.includes("member") ? null : (
      <>
        <p>Mint a DRED member token to join as a node operator</p>
        <div className="-mt-12 mb-4 flex items-center justify-end">
          <button
            onClick={mintMemberToken}
            disabled={mintingMemberToken}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
          >
            {mintingMemberToken ? "Minting..." : "Mint Member Token"}
          </button>
        </div>
        {showInfo}
      </>
    );

  const form =
    registerMember ||
    (showEditor ? (
      <NodeRegEditor
        create={editingNode ? false : true}
        datumUtxo={editingNode}
        refresh={handleRefresh}
        onSave={handleSave}
        onClose={handleClose}
      />
    ) : null);

  //   console.log("Rendering OperatorPage, showEditor.value:", showEditor, "form:", !!form);
  return (
    <div className="container mx-auto px-4">
      {/* <div style={{backgroundColor: 'yellow', padding: '10px', margin: '10px'}}>
        DEBUG: showEditor = {showEditor ? "true" : "false"}
      </div> */}
      {/* Header with title and register button */}
      {form || (
        <div className="-mt-14 mb-4 flex items-center justify-end">
          <button
            onClick={handleRegisterNewNode}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
          >
            Register New Node
          </button>
        </div>
      )}
      {form && <hr className="my-4" />}

      <NodeRegTable
        nodeRegistryData={nodeRegistryData.value}
        // settingsDetail={settingsDetail.value}
        memberTokenFilter={userMemberToken.value}
        editNode={editNode}
      />
      <div className="mb-6 flex flex-col w-full items-start justify-start">
        <p className="text-left text-sm text-gray-500">
          Updated {lastUpdate.value.toLocaleString()}
        </p>
        {/* {showInfo} */}
      </div>
    </div>
  );
}

export default OperatorPage;
