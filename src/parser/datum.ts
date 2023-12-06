import { csl } from '../csl';

export const parseInlineDatum = <T extends { inline_datum?: string }, X>(utxo: T): X => {
    const datumCbor: string = utxo.inline_datum || '';
    const parsedDatum = csl.PlutusData.from_hex(datumCbor);
    const datum: X = JSON.parse(parsedDatum.to_json(1));
    return datum as X;
};
