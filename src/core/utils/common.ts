import { csl } from '../../csl';

export const bytesToHex = (bytes: ArrayBuffer) => Buffer.from(bytes).toString('hex');

export const hexToBytes = (hex: string) => Buffer.from(hex, 'hex');

export const stringToHex = (str: string) => Buffer.from(str, 'utf8').toString('hex');

export const hexToString = (hex: string) => Buffer.from(hex, 'hex').toString('utf8');

export const hexToObj = <T>(hex: string): T => JSON.parse(csl.PlutusData.from_hex(hex).to_json(1));

export const objToHex = <T>(obj: T): string =>
    csl.PlutusData.from_json(JSON.stringify(obj), 1).to_hex();
