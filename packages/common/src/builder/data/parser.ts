export const bytesToHex = (bytes: ArrayBuffer) => Buffer.from(bytes).toString('hex');

export const hexToBytes = (hex: string) => Buffer.from(hex, 'hex');

export const stringToHex = (str: string) => Buffer.from(str, 'utf8').toString('hex');

export const hexToString = (hex: string) => Buffer.from(hex, 'hex').toString('utf8');
