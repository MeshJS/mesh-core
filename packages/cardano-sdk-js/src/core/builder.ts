/* eslint-disable class-methods-use-this */
/* eslint-disable lines-between-class-members */
import { IMeshSerializer, MeshTxBuilderBody, Protocol } from '@meshsdk/common';

export class JsSerializer implements IMeshSerializer {
    serializeTxBody(txBody: MeshTxBuilderBody, protocolParams: Protocol): string {
        throw new Error('Method not implemented.');
    }
    addSigningKeys(txHex: string, signingKeys: string[]): string {
        throw new Error('Method not implemented.');
    }
}
