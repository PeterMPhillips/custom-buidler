"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("ethers/utils");
const os_1 = require("os");
const path_1 = __importDefault(require("path"));
const params_1 = require("~/src/params");
const fsUtils_1 = require("~/src/utils/fsUtils");
// Standard Aragon test paths
const aragonConfig = '.aragon';
const genericName = 'mnemonic.json';
const byNetworkName = (network) => `${network}_key.json`;
const defaultMnemonic = params_1.aragenMnemonic;
/**
 * Utility to ensure and array of strings has hex encoding
 * @param keys ['34b...456', '0x456...3e2']
 */
const ensureHexEncoding = (keys) => keys.map(key => (utils_1.isHexString(key) ? key : `0x${key}`));
exports.configExtender = (finalConfig, userConfig) => {
    const genericMnemonic = readAragonConfig(genericName);
    // Add mnemonics from .aragon config only to selected networks
    for (const networkName of ['mainnet', 'ropsten', 'rinkeby', 'kovan']) {
        // Apply defaults. Note networks may not exists in finalConfig
        const finalNetwork = Object.assign(Object.assign({}, ((userConfig.networks || {})[networkName] || {})), ((finalConfig.networks || {})[networkName] || {}));
        // Apply account data from the config folder
        const byNetworkMnemonic = readAragonConfig(byNetworkName(networkName));
        if (byNetworkMnemonic) {
            const { rpc, keys } = byNetworkMnemonic;
            if (!finalNetwork.url && rpc)
                finalNetwork.url = rpc;
            if (!finalNetwork.accounts && keys)
                finalNetwork.accounts = ensureHexEncoding(keys);
        }
        // Generic mnemonic
        if (genericMnemonic && !finalNetwork.accounts) {
            finalNetwork.accounts = genericMnemonic;
        }
        // Fallback mnemonic
        if (!finalNetwork.accounts) {
            finalNetwork.accounts = {
                mnemonic: defaultMnemonic
            };
        }
        // Since finalNetwork is new reference (due to { ... }) re-assign to finalConfig
        if (!finalConfig.networks)
            finalConfig.networks = {};
        finalConfig.networks[networkName] = finalNetwork;
    }
};
/**
 * Utility to read JSON files from aragonConfig dirs
 * Returns undefined if the file does not exist
 * @param filename 'mnemonic.json'
 */
function readAragonConfig(filename) {
    return fsUtils_1.readJsonIfExists(path_1.default.join(os_1.homedir(), aragonConfig, filename));
}
//# sourceMappingURL=mnemonic.js.map