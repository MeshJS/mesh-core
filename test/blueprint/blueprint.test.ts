import {
    BPByteArray,
    BPConstructor,
    BPInt,
    BPList,
    builtinByteString,
    conStr,
    integer,
    parseBlueprintDefinition,
} from '../../src';
import Blueprint from './mock_blueprint.json';

export const replacer = (key: unknown, value: unknown) =>
    typeof value === 'bigint' ? value.toString() : value;

describe('Blueprint', () => {
    // test('ByteArray', () => {
    //     const { definitions } = Blueprint;
    //     const definition = Blueprint.definitions.ByteArray;
    //     const def: BPByteArray = parseBlueprintDefinition(definitions, definition) as BPByteArray;
    //     def.bytes = '123';
    //     expect(JSON.stringify(def.toObject())).toBe(JSON.stringify({ bytes: '123' }));
    // });
    // test('Int', () => {
    //     const { definitions } = Blueprint;
    //     const definition = Blueprint.definitions.Int;
    //     const def: BPInt = parseBlueprintDefinition(definitions, definition) as BPInt;
    //     def.int = 123;
    //     expect(JSON.stringify(def.toObject())).toBe(JSON.stringify({ int: 123 }));
    // });
    test('List', () => {
        const { definitions } = Blueprint;
        const definition = Blueprint.definitions.List$ByteArray;
        const def = parseBlueprintDefinition(definitions, definition);

        expect(JSON.stringify(def.toObject())).toBe(JSON.stringify({ list: [] }));
    });
    // test('Constructor', () => {
    //     const definition = Blueprint.definitions['aiken/transaction/TransactionId'];
    //     const def: Constructor = parseBlueprintDefinition(definition) as Constructor;
    //     def.conStr = 3;
    //     def.fields = [builtinByteString('123')];
    //     console.log('defin?', def);
    //     expect(JSON.stringify(def.toObject())).toBe(
    //         JSON.stringify(conStr(3, [builtinByteString('123')])),
    //     );
    // });
});
