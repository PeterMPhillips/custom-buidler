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
const abis = __importStar(require("~/src/utils/apm/abis"));
describe('apm > abis', () => {
    for (const [abiName, abi] of Object.entries(abis)) {
        it(`Should create an instance from ${abiName}`, () => {
            // Calling ethers.utils.Interface ensures the ABIs are valid
            // Since they are compiled at run time, check here
            new ethers_1.ethers.utils.Interface(abi);
        });
    }
});
//# sourceMappingURL=abis.test.js.map