import { Data } from '@meshsdk/core';

export const mConStr0 = <T extends Data[]>(fields: T): Data => ({
    alternative: 0,
    fields,
});

export const mConStr1 = <T extends Data[]>(fields: T): Data => ({
    alternative: 1,
    fields,
});

export const mMaybeStakingHash = (stakeCredential: string): Data => {
    if (stakeCredential === '') {
        return mConStr1<[]>([]);
    }
    return mConStr0([mConStr0([mConStr0([stakeCredential])])]);
};

export const mPubKeyAddress = (bytes: string, stakeCredential?: string): Data =>
    mConStr0([{ alternative: 0, fields: [bytes] }, mMaybeStakingHash(stakeCredential || '')]);

export const mScriptAddress = (bytes: string, stakeCredential?: string): Data =>
    mConStr0([{ alternative: 1, fields: [bytes] }, mMaybeStakingHash(stakeCredential || '')]);
