import { Budget, Protocol } from '@meshsdk/core';
import { csl } from './csl';

export const DEFAULT_REDEEMER_BUDGET: Budget = {
    mem: 7_000_000,
    steps: 3_000_000_000,
};

export const DEFAULT_PROTOCOL_PARAMETERS: Protocol = {
    epoch: 0,
    coinsPerUTxOSize: '4310',
    priceMem: 0.0577,
    priceStep: 0.0000721,
    minFeeA: 44,
    minFeeB: 155381,
    keyDeposit: '2000000',
    maxTxSize: 16384,
    maxValSize: '5000',
    poolDeposit: '500000000',
    maxCollateralInputs: 3,
    decentralisation: 0,
    maxBlockSize: 98304,
    collateralPercent: 150,
    maxBlockHeaderSize: 1100,
    minPoolCost: '340000000',
    maxTxExMem: '16000000',
    maxTxExSteps: '10000000000',
    maxBlockExMem: '80000000',
    maxBlockExSteps: '40000000000',
};

export const LANGUAGE_VERSIONS = {
    V1: csl.Language.new_plutus_v1(),
    V2: csl.Language.new_plutus_v2(),
};

export const REDEEMER_TAGS = {
    CERT: csl.RedeemerTag.new_cert(),
    MINT: csl.RedeemerTag.new_mint(),
    REWARD: csl.RedeemerTag.new_reward(),
    SPEND: csl.RedeemerTag.new_spend(),
};

export const POLICY_ID_LENGTH = 56;
