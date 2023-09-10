import csl from '@emurgo/cardano-serialization-lib-nodejs';
import { SidanPlutusData } from './plutusData';
import { parsePlutusAddressToBech32 } from 'src/utils';

export class SidanAddress {
    self: csl.Address

    constructor() {};

    fromBech32 = (bech32Address: string) => {
        this.self = csl.Address.from_bech32(bech32Address);
        return this;
    };

    fromPlutusData = (plutusData: SidanPlutusData, networkId: number = 0) => {
        this.self = csl.Address.from_bech32(parsePlutusAddressToBech32(plutusData.return().to_hex(), networkId));
        return this;
    };

    return = () => {
        return this.self;
    };
}