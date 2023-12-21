import { csl } from '../csl';

export const poolIdHashToBech32 = (poolIdHash: string) => {
    const cslPoolIdHash = csl.Ed25519KeyHash.from_hex(poolIdHash);
    return cslPoolIdHash.to_bech32('pool');
};

export const poolIdBech32ToHex = (poolIdBech32: string) => {
    const cslPoolIdHash = csl.Ed25519KeyHash.from_bech32(poolIdBech32);
    return Buffer.from(cslPoolIdHash.to_bytes()).toString('hex');
};
