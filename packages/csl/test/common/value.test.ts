import { Asset } from '@meshsdk/core';
import { value, Value, parsePlutusValueToAssets } from '../../src';

describe('Value', () => {
    test('Simple ADA Value', () => {
        const val: Asset[] = [{ unit: 'lovelace', quantity: '1000000' }];
        const plutusValue: Value = value(val);
        const assets: Asset[] = parsePlutusValueToAssets(plutusValue);

        expect(JSON.stringify(val)).toBe(JSON.stringify(assets));
    });
    test('Simple token Value', () => {
        const val: Asset[] = [
            {
                unit: 'baefdc6c5b191be372a794cd8d40d839ec0dbdd3c28957267dc8170074657374696e676e657777616c2e616461',
                quantity: '345',
            },
        ];
        const plutusValue: Value = value(val);
        const assets: Asset[] = parsePlutusValueToAssets(plutusValue);

        expect(JSON.stringify(val)).toBe(JSON.stringify(assets));
    });
    test('Complex Value', () => {
        const val: Asset[] = [
            { unit: 'lovelace', quantity: '1000000' },
            {
                unit: 'baefdc6c5b191be372a794cd8d40d839ec0dbdd3c28957267dc817001234',
                quantity: '567',
            },
            {
                unit: 'baefdc6c5b191be372a794cd8d40d839ec0dbdd3c28957267dc8170074657374696e676e657777616c2e616461',
                quantity: '345',
            },
        ];
        const plutusValue: Value = value(val);
        const assets: Asset[] = parsePlutusValueToAssets(plutusValue);
        expect(JSON.stringify(val)).toBe(JSON.stringify(assets));
    });
});
