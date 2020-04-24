import Web3 from 'web3';
import { TruffleEnvironmentArtifacts } from '@nomiclabs/buidler-truffle5/src/artifacts';
import { KernelInstance } from '~/typechain';
import { AragonAppJson } from '~/src/types';
export declare const DUMMY_BYTES = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
/**
 * Scans arapp.json, setting all permissions to ANY_ADDRESS.
 */
export declare function setAllPermissionsOpenly(dao: KernelInstance, app: any, // TODO: needs type
arapp: AragonAppJson, web3: Web3, artifacts: TruffleEnvironmentArtifacts): Promise<void>;
//# sourceMappingURL=set-permissions.d.ts.map