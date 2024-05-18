import { Data } from './Data';

export type RedeemerTag = 'CERT' | 'MINT' | 'REWARD' | 'SPEND';

export type Budget = {
    mem: number;
    steps: number;
};

export type Action = {
    data: Data;
    index: number;
    budget: Budget;
    tag: RedeemerTag;
};
