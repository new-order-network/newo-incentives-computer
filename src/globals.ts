import { ethers } from 'ethers';

export const ChainId = { MAINNET: 1, GOERLI: 5, LOCAL: 1337 };

export const weeklyDistribution = ethers.utils.parseEther('100'); // give 100 NEWO this week

// mainnet and testnet
export const CONTRACTS_ADDRESSES =
  process.env.PRODUCTION_SETUP === 'true'
    ? {
        MulticallWithFailure: '0xBA22FA85650735f9cF097AD1bd935875348a0A64', // gorli
        poolAddress: '0x1e9150452eB8d7D99e58C6dB2a5Bdfb634EA5d42',
        // MulticallWithFailure: 'https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441#contracts',
        NEWO: '0x98585dFc8d9e7D48F0b1aE47ce33332CF4237D96',
        veNEWO: '0x44dd83E0598e7A3709cF0b2e59D3319418068a65',
        MerkleRootDistributor: '0xde6F60c3BDf5392801DD2aA121c552D8E831bE37',
      }
    : {
        MulticallWithFailure: '0xBA22FA85650735f9cF097AD1bd935875348a0A64',
        poolAddress: '0x1e9150452eB8d7D99e58C6dB2a5Bdfb634EA5d42',
        NEWO: '0x5bC64b595AaB6546Df583e90C5120E99Ade06ECD',
        veNEWO: '0xCf3853bf117e70798555749AD2dAAe7AE9963181',
        MerkleRootDistributor: '0xde6F60c3BDf5392801DD2aA121c552D8E831bE37',
      };
