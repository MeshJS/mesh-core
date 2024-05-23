import { PubKeyAddress, ScriptAddress } from '@meshsdk/common';
import { csl } from '../deser';
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
    const bech32Addr = csl.parse_plutus_address_obj_to_bech32(
        JSON.stringify(plutusDataAddressObject),
        networkId,
    );
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
