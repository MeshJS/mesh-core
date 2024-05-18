import { MeshTxBuilderBody } from './types';
import { Protocol } from '../types';

export const emptyTxBuilderBody = (): MeshTxBuilderBody => ({
    inputs: [],
    outputs: [],
    extraInputs: [],
    selectionThreshold: 0,
    collaterals: [],
    requiredSignatures: [],
    referenceInputs: [],
    mints: [],
    changeAddress: '',
    metadata: [],
    validityRange: {},
    certificates: [],
    signingKey: [],
});

export interface IMeshSerializer {
    serializeTxBody(txBody: MeshTxBuilderBody, protocolParams: Protocol): string;
    addSigningKeys(txHex: string, signingKeys: string[]): string;
}
