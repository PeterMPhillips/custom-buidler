import Web3 from 'web3';
import { TruffleEnvironmentArtifacts } from '@nomiclabs/buidler-truffle5/src/artifacts';
import { KernelInstance } from '~/typechain';
/**
 * Deploys a new DAO with direct/pure interaction with aragonOS.
 * @returns DAO's Kernel TruffleContract.
 */
export declare function createDao(web3: Web3, artifacts: TruffleEnvironmentArtifacts, daoFactoryAddress: string): Promise<KernelInstance>;
//# sourceMappingURL=create-dao.d.ts.map