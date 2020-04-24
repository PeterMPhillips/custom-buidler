import Web3 from 'web3';
import { TruffleEnvironmentArtifacts } from '@nomiclabs/buidler-truffle5/src/artifacts';
import { DAOFactoryInstance, APMRegistryInstance, ENSInstance } from '~/typechain';
/**
 * Deploys a new DAOFactory with direct/pure interaction with aragonOS.
 * @returns DAOFactory's instance.
 */
export declare function deployApm(web3: Web3, artifacts: TruffleEnvironmentArtifacts, ens: ENSInstance, daoFactory: DAOFactoryInstance): Promise<APMRegistryInstance>;
//# sourceMappingURL=deploy-apm.d.ts.map