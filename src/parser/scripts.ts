import { csl } from '../csl';

export const getV2ScriptHash = (script: string): string =>
    csl.PlutusScript.from_hex_with_version(script, csl.Language.new_plutus_v2()).hash().to_hex();
