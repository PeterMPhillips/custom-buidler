"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getLog_1 = require("~/src/utils/getLog");
/**
 * Deploys a new ENS instance using a ENSFactory.
 * @returns ENS's instance.
 */
async function deployEns(web3, artifacts) {
    const rootAccount = (await web3.eth.getAccounts())[0];
    // Retrieve contract artifacts.
    const ENS = artifacts.require('ENS');
    const ENSFactory = artifacts.require('ENSFactory');
    // Deploy a ENSFactory.
    const factory = await ENSFactory.new();
    const txResponse = await factory.newENS(rootAccount);
    // Find the created ENS instance address from the transaction logs.
    const ensAddress = getLog_1.getLog(txResponse, 'DeployENS', 'ens');
    const ens = await ENS.at(ensAddress);
    return ens;
}
exports.deployEns = deployEns;
//# sourceMappingURL=deploy-ens.js.map