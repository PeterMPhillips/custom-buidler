"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const params_1 = require("~/src/params");
const arappUtils_1 = require("~/src/utils/arappUtils");
const aragonRpc = (network) => `https://${network}.eth.aragon.network`;
const localRpc = 'http://localhost:8545';
const coverageRpc = 'http://localhost:8555';
const frameRpc = 'ws://localhost:1248';
const aragenNetwork = {
    url: localRpc,
    gas: 6.9e6,
    ensAddress: params_1.defaultLocalAragonBases.ensAddress,
    accounts: { mnemonic: params_1.aragenMnemonic }
};
const defaultNetworks = {
    // Local networks
    development: aragenNetwork,
    localhost: aragenNetwork,
    aragen: aragenNetwork,
    rpc: aragenNetwork,
    devnet: aragenNetwork,
    // External networks
    mainnet: {
        chainId: 1,
        url: aragonRpc('mainnet'),
        gas: 7.9e6,
        gasPrice: 3000000001
    },
    ropsten: {
        chainId: 3,
        url: aragonRpc('ropsten'),
        gas: 4.712e6
    },
    rinkeby: {
        chainId: 4,
        url: aragonRpc('rinkeby'),
        gas: 6.9e6,
        gasPrice: 15000000001
    },
    coverage: {
        url: coverageRpc,
        gas: 0xffffffffff,
        gasPrice: 0x01
    },
    frame: {
        url: frameRpc
    }
};
exports.configExtender = (finalConfig, userConfig) => {
    // Apply defaults. Note networks may not exists in finalConfig
    for (const [networkName, network] of Object.entries(defaultNetworks)) {
        finalConfig.networks[networkName] = Object.assign(Object.assign(Object.assign({}, network), ((userConfig.networks || {})[networkName] || {})), ((finalConfig.networks || {})[networkName] || {}));
    }
    // Apply networks from arapp.json
    const arapp = arappUtils_1.readArappIfExists();
    if (arapp && typeof arapp.environments === 'object') {
        for (const [networkName, network] of Object.entries(arapp.environments)) {
            if (network.network && finalConfig.networks[network.network]) {
                const finalNetwork = finalConfig.networks[network.network];
                // Append registry address
                if (network.registry) {
                    finalNetwork.ensAddress = network.registry;
                }
                // Create an alias of the declared network to an existing network
                if (network.network !== networkName)
                    finalConfig.networks[networkName] = finalNetwork;
            }
        }
    }
};
//# sourceMappingURL=networks.js.map