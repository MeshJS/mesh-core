import { Data } from '@meshsdk/core';

export const mConStr0 = <T extends Data[]>(fields: T): Data => ({
    alternative: 0,
    fields,
});

export const mConStr1 = <T extends Data[]>(fields: T): Data => ({
    alternative: 1,
    fields,
});

export const meshMaybeStakingHash = (stakeCredential: string): Data => {
    if (stakeCredential === '') {
        return mConStr1<[]>([]);
    }
    return mConStr0([mConStr0([mConStr0([stakeCredential])])]);
};

export const meshPubKeyAddress = (bytes: string, stakeCredential?: string): Data =>
    mConStr0([{ alternative: 0, fields: [bytes] }, meshMaybeStakingHash(stakeCredential || '')]);

export const meshScriptAddress = (bytes: string, stakeCredential?: string): Data =>
    mConStr0([{ alternative: 1, fields: [bytes] }, meshMaybeStakingHash(stakeCredential || '')]);
