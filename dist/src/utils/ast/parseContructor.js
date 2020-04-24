"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser = __importStar(require("solidity-parser-antlr"));
/**
 * Returns true if a contract has a constructor, otherwise false.
 *
 * @param sourceCode Source code of the contract.
 */
function hasConstructor(sourceCode) {
    const ast = parser.parse(sourceCode, {});
    let foundConstructor = false;
    parser.visit(ast, {
        FunctionDefinition: function (node) {
            if (!node.isConstructor)
                return;
            foundConstructor = true;
        }
    });
    return foundConstructor;
}
exports.hasConstructor = hasConstructor;
//# sourceMappingURL=parseContructor.js.map