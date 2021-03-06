/// <reference types="truffle-typings" />
import { AbiItem as AbiItemFromWeb3 } from 'web3-utils';
import { BuidlerConfig, BuidlerRuntimeEnvironment } from '@nomiclabs/buidler/types';
import { KernelInstance } from '~/typechain';
export declare type AbiItem = AbiItemFromWeb3;
export interface BuidlerAragonConfig extends BuidlerConfig {
    aragon?: AragonConfig;
}
export interface AragonConfig {
    appServePort?: number;
    clientServePort?: number;
    appSrcPath?: string;
    appBuildOutputPath?: string;
    ignoreFilesPath?: string;
    /**
     * IPFS gateway to pull published data; static files from existing
     * APM versions. Used in publish to get your app's latests version
     * or to pull external app data with the _experimentalAppInstaller
     *
     * Examples:
     * - http://your-remote-node.io:8080
     * - https://ipfs.io
     * - https://ipfs.eth.aragon.network
     *
     * Defaults to: 'https://ipfs.eth.aragon.network'
     */
    ipfsGateway?: string;
    /**
     * IPFS HTTP API endpoint to push new data. Used in publish
     * to upload the assets of your new app's version
     *
     * This API must have the following routes available
     * - /api/v0/version
     * - /api/v0/add
     *
     * Examples:
     * - http://your-remote-node.io:5001
     * - https://ipfs.infura.io
     *
     * You must provide a valid value to publish a new version
     */
    ipfsApi?: string;
    hooks?: AragonConfigHooks;
}
declare type AragonHook<T, R> = (params: T & {
    log: (message: string) => void;
}, bre: BuidlerRuntimeEnvironment) => Promise<R> | R;
export interface AragonConfigHooks {
    preDao?: AragonHook<{}, void>;
    postDao?: AragonHook<{
        dao: KernelInstance;
        _experimentalAppInstaller: AppInstaller;
    }, void>;
    preInit?: AragonHook<{
        proxy: Truffle.ContractInstance;
        _experimentalAppInstaller: AppInstaller;
    }, void>;
    postInit?: AragonHook<{
        proxy: Truffle.ContractInstance;
        _experimentalAppInstaller: AppInstaller;
    }, void>;
    getInitParams?: AragonHook<{}, any[]>;
    setupPermissions?: AragonHook<{
        dao: KernelInstance;
        proxy: Truffle.ContractInstance;
        createPermission: Function;
    }, void>;
    postUpdate?: AragonHook<{
        proxy: Truffle.ContractInstance;
    }, void>;
}
/**
 * arapp.json
 */
export interface Role {
    name: string;
    id: string;
    params: string[];
    bytes: string;
}
export interface AragonManifest {
    name: string;
    author: string;
    description: string;
    changelog_url: string;
    details_url: string;
    source_url: string;
    icons: {
        src: string;
        sizes: string;
    }[];
    screenshots: {
        src: string;
    }[];
    script: string;
    start_url: string;
}
interface AragonArtifactFunction {
    roles: string[];
    sig: string;
    /**
     * This field might not be able if the contract does not use
     * conventional solidity syntax and Aragon naming standards
     * null if there in no notice
     */
    notice: string | null;
    /**
     * The function's ABI element is included for convenience of the client
     * null if ABI is not found for this signature
     */
    abi: AbiItem | null;
}
export interface AragonArtifact extends AragonAppJson {
    roles: Role[];
    abi: AbiItem[];
    /**
     * All publicly accessible functions
     * Includes metadata needed for radspec and transaction pathing
     * initialize() function should also be included for completeness
     */
    functions: AragonArtifactFunction[];
    /**
     * Functions that are no longer available at `version`
     */
    deprecatedFunctions: {
        [version: string]: AragonArtifactFunction[];
    };
    /**
     * The flaten source code of the contracts must be included in
     * any type of release at this path
     */
    flattenedCode: string;
    appId: string;
    appName: string;
}
export interface AragonAppJson {
    roles: Role[];
    environments: AragonEnvironments;
    path: string;
    dependencies?: {
        appName: string;
        version: string;
        initParam: string;
        state: string;
        requiredPermissions: {
            name: string;
            params: string;
        }[];
    }[];
    /**
     * If the appName is different per network use environments
     * ```ts
     * environments: {
     *   rinkeby: {
     *     appName: "myapp.open.aragonpm.eth"
     *   }
     * }
     * ```
     */
    appName?: string;
}
export interface AragonEnvironments {
    [environmentName: string]: AragonEnvironment;
}
export interface AragonEnvironment {
    network: string;
    registry?: string;
    appName?: string;
    gasPrice?: string;
    wsRPC?: string;
    appId?: string;
}
/**
 * App object returned by the aragon-js wrapper
 */
export interface AragonApp {
    abi: AbiItem[];
    name: string;
    appName: string;
    roles: any[];
    functions: any[];
    isAragonOsInternalApp: boolean;
    proxyAddress: string;
    appId: string;
    codeAddress: string;
    isForwarder: boolean;
}
export interface AclPermissions {
    [toAppAddress: string]: {
        [roleHash: string]: {
            allowedEntities: string[];
            manager: string;
        };
    };
}
export interface AclPermission {
    to: string;
    role: string;
    allowedEntities: string[];
    manager: string;
}
/**
 * App Installer types
 */
export declare type NetworkType = 'homestead' | 'rinkeby' | 'ropsten' | 'kovan' | 'goerli';
export interface AppOptions {
    version?: string;
    network?: NetworkType;
    initializeArgs?: any[];
    skipInitialize?: boolean;
}
export interface AppInstalled {
    initialize: (_initializeArgs: any[]) => Promise<void>;
    createPermission: (roleName: string, entity?: string) => Promise<void>;
    address: string;
}
export declare type AppInstaller = (name: string, appOptions?: AppOptions) => Promise<AppInstalled>;
export interface AppInstallerOptions {
    apmAddress: string;
    dao: KernelInstance;
    ipfsGateway: string;
}
export {};
//# sourceMappingURL=types.d.ts.map