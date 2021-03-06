"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const plugins_1 = require("@nomiclabs/buidler/plugins");
const appName_1 = require("~/src/utils/appName");
const abis_1 = require("./abis");
const repo = __importStar(require("./repo"));
/**
 * Asserts that a sender has permissions to publish a new version / repo
 * Otherwise will throw an error with a detailed message
 * @param appName "finance.aragonpm.eth"
 * @param sender Account attempting to publish "0xE04cAbcB24e11620Dd62bB99c396E76cEB578914"
 * @param provider Initialized ethers provider
 */
async function assertCanPublish(appName, sender, provider) {
    const repoAddress = await provider.resolveName(appName);
    if (repoAddress) {
        // If the repo exists, check if user has create version role
        const isAllowed = await repo.canPublishVersion(appName, sender, provider);
        if (!isAllowed)
            throw new plugins_1.BuidlerPluginError(`Account ${sender} does not have permissions to publish a new version in repo ${appName}`);
    }
    else {
        // If the repo does not exist yet, create a repo with the first version
        const { registryName } = appName_1.getAppNameParts(appName);
        const registryAddress = await provider.resolveName(registryName);
        if (!registryAddress)
            throw new plugins_1.BuidlerPluginError(`Registry ${registryName} does not exist`);
        const registry = new ethers_1.ethers.Contract(registryAddress, abis_1.apmRegistryAbi, provider);
        const CREATE_REPO_ROLE = await registry.CREATE_REPO_ROLE();
        const isAllowed = await registry.canPerform(sender, CREATE_REPO_ROLE, []);
        if (!isAllowed)
            throw new plugins_1.BuidlerPluginError(`Account ${sender} does not have permissions to create a new repo in registry ${registryName}`);
    }
}
exports.assertCanPublish = assertCanPublish;
//# sourceMappingURL=assertCanPublish.js.map