import JSONbig from 'json-bigint';
import { ByteArray, Int, parseBlueprintDefinition } from '../../src';
import Blueprint from './mock_blueprint.json';

export const replacer = (key: unknown, value: unknown) =>
    typeof value === 'bigint' ? value.toString() : value;

describe('Blueprint', () => {
    test('ByteArray', () => {
        const definition = Blueprint.definitions.ByteArray;
        const def: ByteArray = parseBlueprintDefinition(definition) as ByteArray;
        def.bytes = '123';
        expect(JSON.stringify(def.toObject())).toBe(JSON.stringify({ bytes: '123' }));
    });
    test('Int', () => {
        const pres: bigint = 12345678901234567890n;
        console.log(
            JSONbig.stringify({
                int: pres,
            }),
        );

        // const definition = Blueprint.definitions.ByteArray;
        // const def: Int = parseBlueprintDefinition(definition) as Int;
        // def.int = '123';
        // expect(JSON.stringify(def.toObject())).toBe(JSON.stringify({ bytes: '123' }));
    });
});
