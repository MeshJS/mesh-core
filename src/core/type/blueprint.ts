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
