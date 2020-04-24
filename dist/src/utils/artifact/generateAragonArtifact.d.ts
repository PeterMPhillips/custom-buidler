import { AbiItem } from 'web3-utils';
import { AragonAppJson, AragonArtifact } from '~/src/types';
import { AragonContractFunction } from '~/src/utils/ast';
/**
 * Returns aragon artifact.json from app data
 * @param arapp
 * @param abi
 * @param functions Parsed contract function info
 */
export declare function generateAragonArtifact(arapp: AragonAppJson, abi: AbiItem[], functions: AragonContractFunction[]): AragonArtifact;
/**
 * Returns aragon artifact.json from app data
 * @param arapp
 * @param abi
 * @param flatCode Flat code of target contract plus all imports
 * @param contractName Target contract name or path: "Finance" | "contracts/Finance.sol"
 */
export declare function generateAragonArtifact(arapp: AragonAppJson, abi: AbiItem[], flatCode: string, contractName: string): AragonArtifact;
//# sourceMappingURL=generateAragonArtifact.d.ts.map