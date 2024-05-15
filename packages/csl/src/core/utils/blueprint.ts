/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */

import { BuiltinByteString, ConStr, Integer } from '../type';

export class ByteArray {
    public bytes: string = '';

    constructor(bytes?: string) {
        if (bytes) this.bytes = bytes;
    }

    public toObject(): BuiltinByteString {
        return {
            bytes: this.bytes,
        };
    }
}

export class Int {
    public int: number = 0;

    constructor(int?: number) {
        if (int) this.int = int;
    }

    public toObject(): Integer {
        return {
            int: this.int,
        };
    }
}

export class Constructor {
    public conStr: number = 0;

    public fields: any[] = [];

    constructor(conStr: number, fields: any[]) {
        if (conStr) this.conStr = conStr;
        if (fields) this.fields = fields;
    }

    public toObject(): ConStr {
        return {
            constructor: this.conStr,
            fields: this.fields,
        };
    }
}

export type BlueprintDefinition = Constructor | ByteArray | Int;

export const parseBlueprintDefinition = (item: any, args = []): Constructor | ByteArray | Int => {
    switch (item.dataType) {
        case 'bytes':
            return new ByteArray(...args);
        case 'integer':
            return new Int(...args);
        // case 'constructor':
        //     return Constructor;
        default:
            throw new Error(`Unknown data type: ${item.dataType}`);
    }
};

// export class MeshBlueprint {
//     constructor() {}
// }
