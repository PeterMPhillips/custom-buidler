"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const params_1 = require("~/src/params");
exports.DUMMY_BYTES = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
/**
 * Scans arapp.json, setting all permissions to ANY_ADDRESS.
 */
async function setAllPermissionsOpenly(dao, app, // TODO: needs type
arapp, web3, artifacts) {
    const rootAccount = (await web3.eth.getAccounts())[0];
    // Retrieve ACL.
    const aclAddress = await dao.acl();
    const ACL = artifacts.require('ACL');
    const acl = await ACL.at(aclAddress);
    // Sweep all roles found in arapp.json.
    for (const role of arapp.roles) {
        const permission = await app[role.id]();
        // Set permission to ANY_ADDRESS (max uint256), which is interpreted by
        // the ACL as giving such permission to all addresses.
        await acl.createPermission(params_1.ANY_ADDRESS, app.address, permission, rootAccount, { from: rootAccount });
    }
    // Additionally, set a placeholder permission, so that the app
    // shows in the client even if it doesn't specify permissions yet.
    acl.createPermission(params_1.ANY_ADDRESS, app.address, exports.DUMMY_BYTES, rootAccount);
}
exports.setAllPermissionsOpenly = setAllPermissionsOpenly;
//# sourceMappingURL=set-permissions.js.map