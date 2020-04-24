"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const params_1 = require("~/src/params");
exports.defaultAragonConfig = {
    appServePort: 8001,
    clientServePort: 3000,
    appSrcPath: 'app/',
    appBuildOutputPath: 'dist/',
    ignoreFilesPath: '.',
    ipfsGateway: params_1.defaultIpfsGateway
};
exports.configExtender = (finalConfig, userConfig) => {
    // Apply defaults
    finalConfig.aragon = Object.assign(Object.assign({}, exports.defaultAragonConfig), (userConfig.aragon || {}));
};
//# sourceMappingURL=aragon.js.map