/* eslint-disable default-case */
/* eslint-disable class-methods-use-this */
/* eslint-disable radix */
import type { MeshTxBuilderBody, Protocol, TxInParameter, IMeshSerializer } from '@meshsdk/common';
import { DEFAULT_PROTOCOL_PARAMETERS } from '@meshsdk/common';
import { signTransaction } from '../utils';
import { csl } from '../deser';

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

export class CSLSerializer implements IMeshSerializer {
    protocolParams: Protocol;

    meshTxBuilderBody: MeshTxBuilderBody = emptyTxBuilderBody();

    constructor(protocolParams?: Protocol) {
        this.protocolParams = protocolParams || DEFAULT_PROTOCOL_PARAMETERS;
    }

    serializeTxBody(txBody: MeshTxBuilderBody, protocolParams?: Protocol): string {
        const txHex = csl.js_serialize_tx_body(
            JSON.stringify(txBody),
            JSON.stringify(protocolParams || this.protocolParams),
        );
        return txHex;
    }

    addSigningKeys(txHex: string, signingKeys: string[]): string {
        if (signingKeys.length > 0) {
            return signTransaction(txHex, signingKeys);
        }
        return txHex;
    }

    // Below protected functions for completing tx building

    protected removeDuplicateInputs = () => {
        const { inputs } = this.meshTxBuilderBody;
        const getTxInId = (txIn: TxInParameter): string => `${txIn.txHash}#${txIn.txIndex}`;
        const addedInputs: string[] = [];
        for (let i = 0; i < inputs.length; i += 1) {
            const currentTxInId = getTxInId(inputs[i].txIn);
            if (addedInputs.includes(currentTxInId)) {
                inputs.splice(i, 1);
                i -= 1;
            } else {
                addedInputs.push(currentTxInId);
            }
        }
    };
}
