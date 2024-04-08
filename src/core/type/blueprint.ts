/* eslint-disable @typescript-eslint/no-explicit-any */
export type PreambleType = {
    title: string;
    description: string;
    version: string;
    plutusVersion: string;
    compiler: {
        name: string;
        version: 'v1' | 'v2' | 'v3';
    };
    license: string;
};

export type BPValidator<D, R, P> = {
    title: string;
    datum: {
        title: string;
        schema: {
            $ref: D;
        };
    };
    redeemer: {
        title: string;
        schema: {
            $ref: R;
        };
    };
    parameters: {
        title: string;
        schema: {
            $ref: P;
        };
    }[];
    compiledCode: string;
    hash: string;
};

export type RawBlueprint = {
    preamble: PreambleType;
    validators: BPValidator<string, string, string>[];
    definitions: any[];
};
