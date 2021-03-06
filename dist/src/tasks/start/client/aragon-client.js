"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const execa_1 = __importDefault(require("execa"));
const live_server_1 = __importDefault(require("live-server"));
const os_1 = __importDefault(require("os"));
const open_1 = __importDefault(require("open"));
const path_1 = __importDefault(require("path"));
const plugins_1 = require("@nomiclabs/buidler/plugins");
const logger_1 = require("~/src/ui/logger");
const fsUtils_1 = require("~/src/utils/fsUtils");
const defaultRepo = 'https://github.com/aragon/aragon';
const defaultVersion = '775edd606333a111eb2693df53900039722a95dc';
const aragonBaseDir = path_1.default.join(os_1.default.homedir(), '.aragon');
async function installAragonClientIfNeeded(repo = defaultRepo, version = defaultVersion) {
    const clientPath = _getClientPath(version);
    if (await _checkClientInstallationNeeded(clientPath)) {
        fsUtils_1.ensureDir(clientPath);
        logger_1.logFront(`Installing client version ${version} locally (takes a couple of minutes)...`);
        const opts = { cwd: clientPath };
        try {
            logger_1.logFront('  cloning...');
            await execa_1.default('git', ['clone', '--', repo, clientPath]);
            logger_1.logFront('  checking out version...');
            await execa_1.default('git', ['checkout', version], opts);
            logger_1.logFront('  installing...');
            await execa_1.default('npm', ['install'], opts);
            logger_1.logFront('  building...');
            await execa_1.default('npm', ['run', 'build:local'], opts);
        }
        catch (e) {
            fsUtils_1.remove(clientPath);
            throw new plugins_1.BuidlerPluginError(`There was an error while installing the Aragon client in ${clientPath}. Please make sure that this folder is deleted and try again. \n ${e.stack}`);
        }
        logger_1.logFront('Client installed.');
    }
    return clientPath;
}
exports.installAragonClientIfNeeded = installAragonClientIfNeeded;
async function _checkClientInstallationNeeded(clientPath) {
    if (!fsUtils_1.pathExists(clientPath)) {
        return true;
    }
    if (!fsUtils_1.pathExists(path_1.default.resolve(clientPath, 'build/index.html'))) {
        logger_1.logFront('Malformed client detected, removing it for re-installation.');
        fsUtils_1.remove(clientPath);
        return true;
    }
    logger_1.logFront('Using cached client version.');
    return false;
}
/**
 * Prepares and starts the aragon client
 * @return The URL at which the client is available
 */
async function startAragonClient(clientServePort, subPath, autoOpen = true) {
    const port = clientServePort;
    const clientPath = _getClientPath(defaultVersion);
    const buildPath = path_1.default.join(clientPath, 'build');
    logger_1.logFront(`Serving client files at ${clientPath} at port ${port}...`);
    const closeStaticServer = _createStaticWebserver(port, buildPath);
    const url = `http://localhost:${port}/#/${subPath}`;
    if (autoOpen) {
        await open_1.default(url);
    }
    return { url, close: closeStaticServer };
}
exports.startAragonClient = startAragonClient;
/**
 * Triggers a complete client refresh (not just the iFrame) by making a dummy
 * change to the client files being served.
 * Works in tandem with live-server, which is watching for changes
 * in the client files and is in charge of triggering the actual
 * page reload.
 */
async function refreshClient(version = defaultVersion) {
    const clientPath = _getClientPath(version);
    const data = { time: new Date().getTime() };
    fsUtils_1.writeJson(path_1.default.join(clientPath, 'build', 'bump.json'), data);
}
exports.refreshClient = refreshClient;
function _getClientPath(version) {
    return path_1.default.join(aragonBaseDir, `client-${version}`);
}
/**
 * Creates a static files HTTP server
 * Resolves when the server starts to listen
 * @param port 3000
 * @param rootPath Dir to serve files from
 */
function _createStaticWebserver(port, root = '.') {
    live_server_1.default.start({
        open: false,
        cors: true,
        root,
        port
    });
    return function close() {
        live_server_1.default.shutdown();
    };
}
exports._createStaticWebserver = _createStaticWebserver;
//# sourceMappingURL=aragon-client.js.map