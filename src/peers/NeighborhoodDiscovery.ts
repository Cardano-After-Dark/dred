import {
    GenericSigner,
    TxBatcher,
    type TxBatcherOptions,
    bytesToText,
    environment,
} from "@donecollectively/stellar-contracts";
import type { NbhId } from "../types/ChannelSubscriptions.js";
import {
    type ConnectionThresholds,
    Discovery,
    type findingDredHosts,
    type GenericDiscoveryOptions,
    type promisedConnectionThresholds,
} from "../types/Discovery.js";
import {
    DredCapo,
    NodeRegistryController,
    type NodeRegistrationData,
    makeBlockfrostV0Client,    
    makeRandomRootPrivateKey,
    bytesToHex,
    makeRootPrivateKey,
    makeSimpleWallet,
    hexToBytes,
} from "dred-network-registry";
import type { DredHostDetails } from "../types/DredHosts.js";

/**
 * @public
 */
export class NeighborhoodDiscovery extends Discovery {
    capo!: DredCapo;
    registryController!: NodeRegistryController;
    neighborhood?: NbhId;

    static async forNeighborhood(n: string) {
        const discovery = new this({ neighborhood: n });
        await discovery.initHostDiscovery();
        return discovery;
    }

    constructor(options: GenericDiscoveryOptions) {
        const { neighborhood } = options;
        super(options);
        if (neighborhood) this.neighborhood = neighborhood;
    }

    async initHostDiscovery() {
        const network = environment.CARDANO_NETWORK;
        // console.log(process.env)
        const bfKey = environment.BF_API_KEY 
        if (!bfKey) throw new Error("required env variable BF_API_KEY is not set");
        if (!network) throw new Error("required env variable CARDANO_NETWORK is not set");

        const bf = makeBlockfrostV0Client(network as any, bfKey);

        // temporary until we load the node private key as provided by the service runner
        const entropy = makeRandomRootPrivateKey().entropy;
        const privKeyHex = bytesToHex(entropy);
        const privKey = makeRootPrivateKey(hexToBytes(privKeyHex));

        const simpleWallet = makeSimpleWallet(privKey, bf);

        // when we have hex bytes loaded from the service runner:
        // const privKey = makeRootPrivateKey(hexToBytes(privKeyHex));


        const batcherOptions: TxBatcherOptions = {
            submitters: {
                blockfrost: bf,
            },
            ...(simpleWallet
                ? {
                      signingStrategy: new GenericSigner(simpleWallet),
                  }
                : {}),
        };

        this.logger.info("Creating capo with simple wallet");
        const capo: DredCapo = await DredCapo.createWith({
            setup: {
                network: bf,
                networkParams: await bf.parameters,
                txBatcher: new TxBatcher(batcherOptions),
                actorContext: {
                    wallet: simpleWallet,
                },
                isMainnet: network === "mainnet",
                optimize: true,
            },
        });
        this.logger.info("Capo created");
        this.capo = capo;
        this.registryController = await capo.getNodeRegistryController();
        this.logger.info("Registry controller created");
    }

    // async getNeighborhoods() {
    //     return ["cardano-after-dark"]; //!!! todo: use discovery service to find registered neighborhoods
    // }
    async getHostList(): Promise<DredHostDetails[]> {
        this.logger.info("Getting host list");
        const hosts = await this.registryController.findRecords();
        const capo = this.capo;
        const capoUtxos = await capo.findCapoUtxos();
        this.logger.info("utxos:",capoUtxos.length);
        const charterData = await capo.findCharterData(undefined, {
            optional: false,
            capoUtxos,
          });

          const nodeEntries = await capo.findNodeOpEntries({
            capoUtxos,
            charterData,
          });
    
            console.log(hosts.map(h => h.data!));
    this.logger.info(`^ found ${hosts.length} hosts in neighborhood ${this.neighborhood}`);
    
    // Map node entries to DredHostDetails
    const allNodes = nodeEntries.map((h) => {
        const details : DredHostDetails = {
            address: h.data!.nodeDetails.address,
            port: h.data!.nodeDetails.port,
            serverId: bytesToText(h.data!.id),                
            publicKey: h.data!.nodeDetails.pubKey.toString(),
            pubKeyHash: h.data!.nodeDetails.pubKeyHash.toString(),
        };
        return details;
    });

    // Filter out self if DRED_NODE_ID is specified
    const nodeId = process.env.DRED_NODE_ID;
    if (nodeId) {
        this.logger.info(`Filtering out self-node with ID: ${nodeId}`);
        const filteredNodes = allNodes.filter(node => node.serverId !== nodeId);
        this.logger.info(`Before filtering: ${allNodes.length} nodes, After filtering: ${filteredNodes.length} nodes`);
        
        if (filteredNodes.length === allNodes.length) {
            this.logger.warn(`DRED_NODE_ID "${nodeId}" not found in discovered nodes. Available nodes: ${allNodes.map(n => n.serverId).join(', ')}`);
        }
        
        return filteredNodes;
    } else {
        this.logger.info("No DRED_NODE_ID specified, returning all discovered nodes");
        return allNodes;
    }
    }

    async getConnectionThresholds(): promisedConnectionThresholds {
        //!!! todo: revisit this, perhaps with neighborhood-specific preferences found in discovery,
        //   or by punting to the application.

        return this.clientRedundancyThresholds();
    }
    async serverRedundancyThresholds(): promisedConnectionThresholds {
        if (!this.hosts) {
            throw new Error(`no this.hosts`);
        }

        const count = this.hosts.length;
        if (count > 7) {
            return {
                minimal: 1 + Math.floor(count / 2),
                healthy: Math.ceil((count * 2) / 3),
            };
        }
        if (count > 2) {
            // 3  => need 2, want 3;
            // 4,5  => need 3, want 4;
            // 6, 7 => need  4, want 5;
            const minimal = 1 + Math.floor(count / 2);
            return {
                minimal,
                healthy: minimal + 1,
            };
        }
        if (count > 1) {
            return { minimal: 1, healthy: 2 };
        }
        return { minimal: 1, healthy: 1 };
    }
    async clientRedundancyThresholds(): promisedConnectionThresholds {
        //! it provides some reasonable defaults for getting "enough" connectivity
        //  for clients.

        if (!this.hosts) {
            throw new Error(`no this.hosts`);
        }

        const count = this.hosts.length;
        if (count > 7) {
            return {
                minimal: 3,
                healthy: 4,
            };
        }
        if (count > 3) {
            return {
                minimal: 2,
                healthy: 3,
            };
        }
        if (count > 1) {
            return { minimal: 1, healthy: 2 };
        }
        return { minimal: 1, healthy: 1 };
    }
}
