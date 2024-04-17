/* eslint-disable class-methods-use-this */
/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */

import { BuiltinByteString, ConStr, Integer } from '../type';
import * as plutus from '../type';

export class BPByteArray {
    public bytes: string = '';

    public toObject(): BuiltinByteString {
        return {
            bytes: this.bytes,
        };
    }
}

export class BPInt {
    public int: number = 0;

    public toObject(): Integer {
        return {
            int: this.int,
        };
    }
}

export class BPList<T extends BlueprintDefinition> {
    public elements: T;

    constructor(elements: T) {
        this.elements = elements;
    }

    public toObject(): { list: T[] } {
        return {
            list: [],
        };
    }
}

export class BPConstructor {
    public conStr: number = 0;

    public fields: any[] = [];

    public toObject(): ConStr {
        return {
            constructor: this.conStr,
            fields: this.fields,
        };
    }
}

export type BlueprintDefinition = BPConstructor | BPList<BlueprintDefinition> | BPByteArray | BPInt;

export const parseBlueprintDefinition = <T extends BlueprintDefinition>(
    definitions: Record<string, any>,
    item: any,
): BlueprintDefinition => {
    if (item.dataType === 'bytes') {
        return new BPByteArray() as T;
    }
    if (item.dataType === 'integer') {
        return new BPInt() as T;
    }
    if (item.dataType === 'list') {
        const elementType = item.items.$ref.replace('#/definitions/', '');
        return new BPList(parseBlueprintDefinition(definitions, definitions[elementType])) as T;
    }
    if (item.dataType === 'constructor') {
        return new BPConstructor() as T;
    }
    throw new Error('Unknown data type');
};

// export class MeshBlueprint {
//     constructor() {}
// }
