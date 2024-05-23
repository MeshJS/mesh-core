/* eslint-disable consistent-return */
/* eslint-disable default-case */
import type { BuilderData, Data } from '@meshsdk/common';
import JSONbig from 'json-bigint';
import { csl } from './csl';

/* -----------------[ Address ]----------------- */

export const toAddress = (bech32: string) => csl.Address.from_bech32(bech32);

export const toBaseAddress = (bech32: string) => csl.BaseAddress.from_address(toAddress(bech32));

export const toEnterpriseAddress = (bech32: string) =>
    csl.EnterpriseAddress.from_address(toAddress(bech32));

export const toRewardAddress = (bech32: string) =>
    csl.RewardAddress.from_address(toAddress(bech32));

/* -----------------[ Bytes ]----------------- */

export const fromBytes = (bytes: Uint8Array) => Buffer.from(bytes).toString('hex');

export const toBytes = (hex: string): Uint8Array => {
    if (hex.length % 2 === 0 && /^[0-9A-F]*$/i.test(hex)) return Buffer.from(hex, 'hex');

    return Buffer.from(hex, 'utf-8');
};

/* -----------------[ Lovelace ]----------------- */

export const fromLovelace = (lovelace: number) => lovelace / 1_000_000;

export const toLovelace = (ada: number) => ada * 1_000_000;

/* -----------------[ PlutusData ]----------------- */

export const toPlutusData = (data: Data): csl.PlutusData => {
    const toPlutusList = (dataArray: Data[]) => {
        const plutusList = csl.PlutusList.new();
        dataArray.forEach((element) => {
            plutusList.add(toPlutusData(element));
        });

        return plutusList;
    };

    switch (typeof data) {
        case 'string':
            return csl.PlutusData.new_bytes(toBytes(data));
        case 'number':
            return csl.PlutusData.new_integer(csl.BigInt.from_str(data.toString()));
        case 'bigint':
            return csl.PlutusData.new_integer(csl.BigInt.from_str(data.toString()));
        case 'object':
            if (data instanceof Array) {
                const plutusList = toPlutusList(data);
                return csl.PlutusData.new_list(plutusList);
            }
            if (data instanceof Map) {
                const plutusMap = csl.PlutusMap.new();
                data.forEach((value, key) => {
                    plutusMap.insert(toPlutusData(key), toPlutusData(value));
                });
                return csl.PlutusData.new_map(plutusMap);
            }
            return csl.PlutusData.new_constr_plutus_data(
                csl.ConstrPlutusData.new(
                    csl.BigNum.from_str(data.alternative.toString()),
                    toPlutusList(data.fields),
                ),
            );
    }
};

export const castRawDataToJsonString = (rawData: object | string) => {
    if (typeof rawData === 'object') {
        return JSONbig.stringify(rawData);
    }
    return rawData as string;
};

export const castDataToPlutusData = ({ type, content }: BuilderData): csl.PlutusData => {
    if (type === 'Mesh') {
        return toPlutusData(content);
    }
    if (type === 'CBOR') {
        return csl.PlutusData.from_hex(content as string);
    }
    return csl.PlutusData.from_json(content as string, csl.PlutusDatumSchema.DetailedSchema);
};
