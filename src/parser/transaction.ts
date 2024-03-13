import { blake2bHex } from 'blakejs';
import { csl } from '../csl';
import { hexToBytes } from './common';

const blake2b256 = (rawBytes: Uint8Array) => blake2bHex(rawBytes, undefined, 32);

export const calculateTxHash = (txHex: string) => {
    const cslTx = csl.FixedTransaction.from_hex(txHex);
    const txHash = csl.TransactionHash.from_bytes(
        hexToBytes(blake2b256(cslTx.raw_body())),
    ).to_hex();
    return txHash;
};
