"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns the root or default account from a runtime environment
 * @param bre
 */
async function getRootAccount(bre) {
    const accounts = await bre.web3.eth.getAccounts();
    return accounts[0];
}
exports.getRootAccount = getRootAccount;
//# sourceMappingURL=accounts.js.map