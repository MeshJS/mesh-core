import { csl } from '../csl';

export const bytesToHex = (bytes: ArrayBuffer) => Buffer.from(bytes).toString('hex');

export const hexToBytes = (hex: string) => Buffer.from(hex, 'hex');

export const stringToHex = (str: string) => Buffer.from(str, 'utf8').toString('hex');

export const hexToString = (hex: string) => Buffer.from(hex, 'hex').toString('utf8');

export const addrBech32ToHex = (bech32: string): string => {
    const hexAddress = csl.Address.from_bech32(bech32).to_hex();
    const cslAddress = csl.Address.from_hex(hexAddress);
    const hex = csl.PlutusData.from_address(cslAddress).to_hex();
    return hex;
};

export const addrBech32ToObj = <T>(bech32: string): T => {
    const hexAddress = csl.Address.from_bech32(bech32).to_hex();
    const cslAddress = csl.Address.from_hex(hexAddress);
    const json = JSON.parse(csl.PlutusData.from_address(cslAddress).to_json(1));
    return json;
};

export const hexToObj = <T>(hex: string): T => JSON.parse(csl.PlutusData.from_hex(hex).to_json(1));

export const objToHex = <T>(obj: T): string =>
    csl.PlutusData.from_json(JSON.stringify(obj), 1).to_hex();

export const parseInlineDatum = <T extends { inline_datum?: string }, X>(utxo: T): X => {
    const datumCbor: string = utxo.inline_datum || '';
    const parsedDatum = csl.PlutusData.from_hex(datumCbor);
    const datum: X = JSON.parse(parsedDatum.to_json(1));
    return datum as X;
};

export const serializeBech32Address = (
    bech32Addr: string,
): { pubKeyHash: string; scriptHash: string; stakeCredential: string } => {
    const cslAddress: csl.BaseAddress | undefined = csl.BaseAddress.from_address(
        csl.Address.from_bech32(bech32Addr),
    );
    const cslKeyHash = cslAddress?.payment_cred().to_keyhash()?.to_hex() || '';
    const cslScriptHash = cslAddress?.payment_cred().to_scripthash()?.to_hex() || '';
    const cslStakeHash = cslAddress?.stake_cred().to_keyhash()?.to_hex() || '';
    if (cslKeyHash) {
        return { pubKeyHash: cslKeyHash, scriptHash: '', stakeCredential: cslStakeHash };
    }
    if (cslScriptHash) {
        return { pubKeyHash: '', scriptHash: cslScriptHash, stakeCredential: cslStakeHash };
    }
    const cslEnterprizeAddress = csl.EnterpriseAddress.from_address(
        csl.Address.from_bech32(bech32Addr),
    );
    const cslEAKeyHash = cslEnterprizeAddress?.payment_cred().to_keyhash()?.to_hex() || '';
    if (cslEAKeyHash) {
        return { pubKeyHash: cslEAKeyHash, scriptHash: '', stakeCredential: '' };
    }
    const cslEAScriptHash = cslEnterprizeAddress?.payment_cred().to_scripthash()?.to_hex() || '';
    return { pubKeyHash: '', scriptHash: cslEAScriptHash, stakeCredential: '' };
};

export const parsePlutusAddressToBech32 = (plutusHex: string, networkId = 0) => {
    const cslPlutusDataAddress = csl.PlutusData.from_hex(plutusHex);
    const plutusDataAddressObject = JSON.parse(
        cslPlutusDataAddress.to_json(csl.PlutusDatumSchema.DetailedSchema),
    );
    const plutusDataPaymentKeyObject = plutusDataAddressObject.fields[0];
    const plutusDataStakeKeyObject = plutusDataAddressObject.fields[1];
    const cslPaymentKeyHash = plutusDataPaymentKeyObject.fields[0].bytes;

    // Take into account whether the hash is a PubKeyHash or ScriptHash
    const cslPaymentCredential =
        plutusDataPaymentKeyObject.constructor === 0
            ? csl.StakeCredential.from_keyhash(csl.Ed25519KeyHash.from_hex(cslPaymentKeyHash))
            : csl.StakeCredential.from_scripthash(csl.ScriptHash.from_hex(cslPaymentKeyHash));
    let bech32Addr = '';

    // Parsing address according to whether it has a stake key
    if (
        plutusDataStakeKeyObject.constructor === 0 &&
        plutusDataStakeKeyObject.fields.length !== 0
    ) {
        const cslStakeKeyHash = csl.Ed25519KeyHash.from_hex(
            plutusDataStakeKeyObject.fields[0].fields[0].fields[0].bytes,
        );
        const cslBaseAddress = csl.BaseAddress.new(
            networkId,
            cslPaymentCredential,
            csl.StakeCredential.from_keyhash(cslStakeKeyHash),
        );
        bech32Addr = cslBaseAddress.to_address().to_bech32();
    } else {
        const cslEnterpriseAddress = csl.EnterpriseAddress.new(networkId, cslPaymentCredential);
        bech32Addr = cslEnterpriseAddress.to_address().to_bech32();
    }
    console.log('Parsed address', bech32Addr);
    return bech32Addr;
};
