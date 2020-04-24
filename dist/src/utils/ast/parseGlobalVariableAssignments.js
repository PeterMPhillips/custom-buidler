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
 * Finds global storage variable declarations with initialized values, e.g 'int a = 1'.
 *
 * @param sourceCode Source code of the contract.
 */
function parseGlobalVariableAssignments(sourceCode) {
    const ast = parser.parse(sourceCode, {});
    const variables = [];
    parser.visit(ast, {
        StateVariableDeclaration: function (node) {
            const variable = node.variables[0];
            if (variable.isStateVar &&
                !variable.isDeclaredConst &&
                variable.expression) {
                variables.push(variable.name);
            }
        }
    });
    return variables;
}
exports.parseGlobalVariableAssignments = parseGlobalVariableAssignments;
//# sourceMappingURL=parseGlobalVariableAssignments.js.map