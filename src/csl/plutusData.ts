import csl from '@emurgo/cardano-serialization-lib-nodejs';

export class SidanPlutusData {
    self: csl.PlutusData;

    constructor(plutusDataJSON: string) {
        this.self = csl.PlutusData.from_json(plutusDataJSON, csl.PlutusDatumSchema.DetailedSchema);
    };

    return = () => {
        return this.self;
    };
}