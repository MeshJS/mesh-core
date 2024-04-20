import { Asset } from '@meshsdk/core';
import {
    value,
    Value,
    dict,
    BuiltinByteString,
    Integer,
    builtinByteString,
    integer,
    Dict,
} from '../../src';

describe('Plutus data type', () => {
    describe('Value', () => {
        test('Simple ADA Value', () => {
            const val: Asset[] = [{ unit: 'lovelace', quantity: '1000000' }];
            const datum: Value = value(val);

            const nameMap = dict<BuiltinByteString, Integer>([
                [builtinByteString(''), integer(1000000)],
            ]);
            const valMap = dict<BuiltinByteString, Dict<BuiltinByteString, Integer>>([
                [builtinByteString(''), nameMap],
            ]);
            expect(JSON.stringify(datum)).toBe(JSON.stringify(valMap));
        });
        test('Simple token Value', () => {
            const val: Asset[] = [
                {
                    unit: 'baefdc6c5b191be372a794cd8d40d839ec0dbdd3c28957267dc8170074657374696e676e657777616c2e616461',
                    quantity: '345',
                },
            ];
            const datum: Value = value(val);

            const nameMap = dict<BuiltinByteString, Integer>([
                [builtinByteString('74657374696e676e657777616c2e616461'), integer(345)],
            ]);
            const valMap = dict<BuiltinByteString, Dict<BuiltinByteString, Integer>>([
                [
                    builtinByteString('baefdc6c5b191be372a794cd8d40d839ec0dbdd3c28957267dc81700'),
                    nameMap,
                ],
            ]);
            expect(JSON.stringify(datum)).toBe(JSON.stringify(valMap));
        });
        test('Complex Value', () => {
            const val: Asset[] = [
                { unit: 'lovelace', quantity: '1000000' },
                {
                    unit: 'baefdc6c5b191be372a794cd8d40d839ec0dbdd3c28957267dc8170074657374696e676e657777616c2e616461',
                    quantity: '345',
                },
                {
                    unit: 'baefdc6c5b191be372a794cd8d40d839ec0dbdd3c28957267dc817001234',
                    quantity: '567',
                },
            ];
            const datum: Value = value(val);

            const nameMap = dict<BuiltinByteString, Integer>([
                [builtinByteString('1234'), integer(567)],
                [builtinByteString('74657374696e676e657777616c2e616461'), integer(345)],
            ]);
            const valMap = dict<BuiltinByteString, Dict<BuiltinByteString, Integer>>([
                [builtinByteString(''), dict([[builtinByteString(''), integer(1000000)]])],
                [
                    builtinByteString('baefdc6c5b191be372a794cd8d40d839ec0dbdd3c28957267dc81700'),
                    nameMap,
                ],
            ]);
            expect(JSON.stringify(datum)).toBe(JSON.stringify(valMap));
        });
    });
});
