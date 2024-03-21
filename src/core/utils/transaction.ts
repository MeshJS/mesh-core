import { csl } from '../../csl';

export const calculateTxHash = (txHex: string) => csl.calculate_tx_hash(txHex);

// export const signTransaction = (txHex: string, signingKeys: string[]) => {
//     const

//     csl.sign_transaction(txHex, signingKeys);
// }
