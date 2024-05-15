import { csl } from '../../csl';
import { PubKeyAddress, ScriptAddress } from '../type';
import { getV2ScriptHash } from './scripts';

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

export const parsePlutusAddressObjToBech32 = (
    plutusDataAddressObject: PubKeyAddress | ScriptAddress,
    networkId = 0,
) => {
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
    if (plutusDataStakeKeyObject.constructor === 0) {
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
    return bech32Addr;
};

export const parsePlutusAddressToBech32 = (plutusHex: string, networkId = 0) => {
    const cslPlutusDataAddress = csl.PlutusData.from_hex(plutusHex);
    const plutusDataAddressObject = JSON.parse(
        cslPlutusDataAddress.to_json(csl.PlutusDatumSchema.DetailedSchema),
    );
    return parsePlutusAddressObjToBech32(plutusDataAddressObject, networkId);
};

export const serializeBech32Address = (
    bech32Addr: string,
): { pubKeyHash: string; scriptHash: string; stakeCredential: string } => {
    const serializedAddress = csl.serialize_bech32_address(bech32Addr);
    return {
        pubKeyHash: serializedAddress.get_pub_key_hash(),
        scriptHash: serializedAddress.get_script_hash(),
        stakeCredential: serializedAddress.get_stake_key_hash(),
    };
};

export const scriptHashToBech32 = (scriptHash: string, stakeCredential?: string, networkId = 0) =>
    csl.script_to_address(networkId, scriptHash, stakeCredential);

export const v2ScriptToBech32 = (scriptCbor: string, stakeCredential?: string, networkId = 0) =>
    scriptHashToBech32(getV2ScriptHash(scriptCbor), stakeCredential, networkId);
