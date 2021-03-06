"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins_1 = require("@nomiclabs/buidler/plugins");
const params_1 = require("~/src/params");
const copyExternalArtifacts_1 = require("~/src/utils/copyExternalArtifacts");
const deploy_apm_1 = require("./deploy-apm");
const deploy_dao_factory_1 = require("./deploy-dao-factory");
const deploy_ens_1 = require("./deploy-ens");
/**
 * Deploys the basic Aragon arquitecture bases if necessary.
 * @param bre
 * @return Object of Aragon base addresses
 */
async function deployBases(bre) {
    // ==================== Temporal hack >>>
    // Copy external artifacts to the local artifacts folder
    // This is a temporary hack until multiple artifacts paths are allowed
    for (const externalArtifactPath of params_1.externalArtifactPaths)
        copyExternalArtifacts_1.copyExternalArtifacts(externalArtifactPath);
    // ==================== Temporal hack <<<
    // First, aggregate which bases are deployed and which not
    // by checking if code can be found at the expected addresses.
    const isBaseDeployed = {};
    for (const [name, address] of Object.entries(params_1.defaultLocalAragonBases)) {
        const baseContractCode = await bre.web3.eth.getCode(address);
        // parseInt("0x") = NaN (falsy), parseInt("0x0") = 0 (falsy)
        isBaseDeployed[name] = Boolean(parseInt(baseContractCode));
    }
    // Check if all, none, or some bases are deployed.
    const basesDeployed = Object.values(isBaseDeployed);
    const allBasesAreDeployed = basesDeployed.every(isDeployed => isDeployed);
    const noBasesAreDeployed = basesDeployed.every(isDeployed => !isDeployed);
    // If *all*  bases are deployed => do nothing,
    //    *no*   bases are deployed => deploy them,
    //    *some* bases are deployed => throw an error.
    if (noBasesAreDeployed) {
        const ens = await deploy_ens_1.deployEns(bre.web3, bre.artifacts);
        const daoFactory = await deploy_dao_factory_1.deployDaoFactory(bre.artifacts);
        const apm = await deploy_apm_1.deployApm(bre.web3, bre.artifacts, ens, daoFactory);
        if (ens.address !== params_1.defaultLocalAragonBases.ensAddress)
            throw new plugins_1.BuidlerPluginError(`ENS was deployed at ${ens.address} instead of the expected local address ${params_1.defaultLocalAragonBases.ensAddress}`);
        return {
            ensAddress: ens.address,
            daoFactoryAddress: daoFactory.address,
            apmAddress: apm.address
        };
    }
    else if (!allBasesAreDeployed) {
        throw new plugins_1.BuidlerPluginError(`Only some Aragon bases are deployed in the current testnet. Restart its state and retry`);
    }
    return params_1.defaultLocalAragonBases;
}
exports.default = deployBases;
//# sourceMappingURL=deploy-bases.js.map