import { Asset } from '@meshsdk/core';
import { Value } from './plutus';

export const parsePlutusValueToAssets = (plutusValue: Value): Asset[] => {
    const assets: Asset[] = [];

    plutusValue.map.forEach((policyMap) => {
        const policy = policyMap.k.bytes;
        policyMap.v.map.forEach((tokenMap) => {
            const token = tokenMap.k.bytes;
            const quantity = tokenMap.v.int.toString();
            const unsanitizedUnit = policy + token;
            const unit = unsanitizedUnit === '' ? 'lovelace' : unsanitizedUnit;
            assets.push({ unit, quantity });
        });
    });

    return assets;
};
