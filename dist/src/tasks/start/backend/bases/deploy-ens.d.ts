import Web3 from 'web3';
import { TruffleEnvironmentArtifacts } from '@nomiclabs/buidler-truffle5/src/artifacts';
import { ENSInstance } from '~/typechain';
/**
 * Deploys a new ENS instance using a ENSFactory.
 * @returns ENS's instance.
 */
export declare function deployEns(web3: Web3, artifacts: TruffleEnvironmentArtifacts): Promise<ENSInstance>;
//# sourceMappingURL=deploy-ens.d.ts.map