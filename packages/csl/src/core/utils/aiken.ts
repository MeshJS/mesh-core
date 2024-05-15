import { csl } from '../../csl';

export const applyParamsToScript = (rawAikenScriptBlueprint: string, params: string[]): string => {
    const cslParams = csl.JsVecString.new();
    params.forEach((param) => {
        cslParams.add(param);
    });
    return csl.apply_params_to_script(cslParams, rawAikenScriptBlueprint);
};

export const applyObjParamsToScript = <T extends object>(
    rawAikenScriptBlueprint: string,
    params: T[],
): string => {
    const cslParams = csl.JsVecString.new();
    params.forEach((param) => {
        cslParams.add(JSON.stringify(param));
    });
    return csl.apply_params_to_script(cslParams, rawAikenScriptBlueprint);
};
