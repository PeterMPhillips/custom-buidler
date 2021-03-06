import { ethers } from 'ethers';
export interface AragonJsIntent {
    dao: string;
    proxyAddress: string;
    methodName: string;
    params: string[];
    targetContract: string;
}
/**
 * Parsed APM version info
 */
export interface ApmVersion {
    version: string;
    contractAddress: string;
    contentUri: string;
}
/**
 * Raw APM version returned by the contract
 */
export interface ApmVersionReturn {
    semanticVersion: number[];
    contractAddress: string;
    contentURI: string;
}
export interface PublishVersionTxData {
    to: string;
    methodName: 'newVersion' | 'newRepoWithVersion';
    params: any[];
}
/**
 * Typed contract instance for APM Repo
 * ### TODO: Migrate to a better system such as Typechain
 */
export interface ApmRepoInstance extends ethers.Contract {
    getByVersionId: (versionId: number) => Promise<ApmVersionReturn>;
    getLatest: () => Promise<ApmVersionReturn>;
    getBySemanticVersion: (version: [number, number, number]) => Promise<ApmVersionReturn>;
}
//# sourceMappingURL=types.d.ts.map