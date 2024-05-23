import { Data } from '@meshsdk/common';
import { csl, toPlutusData } from '../deser';

export const applyParamsToScript = (
    rawAikenScriptBlueprint: string,
    params: Data[],
    type: 'Mesh' | 'JSON' | 'CBOR' = 'Mesh',
): string => {
    const cslParams = csl.JsVecString.new();
    let paramType = csl.BuilderDataType.CBOR;

    switch (type) {
        case 'JSON':
            paramType = csl.BuilderDataType.JSON;
            params.forEach((param) => {
                if (typeof param === 'object') {
                    cslParams.add(JSON.stringify(param));
                } else if (typeof param === 'string') {
                    cslParams.add(param);
                }
            });
            break;

        case 'Mesh':
            params.forEach((param) => {
                const paramCbor = toPlutusData(param);
                cslParams.add(paramCbor.to_hex());
            });
            break;

        default:
            params.forEach((param) => {
                cslParams.add(param as string);
            });
            break;
    }

    return csl.apply_params_to_script(rawAikenScriptBlueprint, cslParams, paramType);
};
