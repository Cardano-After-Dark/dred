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
    type ErgoNodeRegistrationData,
} from "dred-network-registry";
import type { DredHostDetails } from "../types/DredHosts.js";

/**
 * @public
 */
export class NeighborhoodDiscovery extends Discovery {
    capo!: DredCapo;
    registryController!: NodeRegistryController;
    neighborhood?: NbhId;
    
    async myServerInfo(serverId: string): Promise<DredHostDetails | undefined> {
        // return this.getHostList().then(hosts => hosts.find(h => h.serverId === serverId));

        const address: string = process.env.LISTEN_ADDRESS || "127.0.0.1";
        const port: number = process.env.LISTEN_PORT ? Number(process.env.LISTEN_PORT) : 3029;

        return {
            address: address,
            port: port,
            serverId: process.env.DRED_NODE_ID || "UNKNOWN-NODE-ID",
            publicKey: "publicKey",
            pubKeyHash: "pubKeyHash",
        }
    }

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

        // For clients we need to fully use environment.CARDANO_NETWORK, etc.;
        const network = process.env.CARDANO_NETWORK;
        // console.log(process.env)
        const bfKey = process.env.BF_API_KEY 
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

    // Filter out self to prevent self-replication (uses DRED_NODE_ID environment variable)
    const nodeId = process.env.DRED_NODE_ID;
    if (nodeId) {

        const filteredNodes = allNodes.filter(node => node.serverId !== nodeId);
        this.logger.info(`Filtered out self-node: ${allNodes.length} -> ${filteredNodes.length} hosts`);
        return filteredNodes;
    }
    
    return allNodes;
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
