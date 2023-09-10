import csl from '@emurgo/cardano-serialization-lib-nodejs';
import { AddressUTXO, BlockFrostOutput, OutputAmount } from '../type/blockfrost';

export const getOutputLovelace = <T extends { amount?: { unit?: string; quantity?: string }[] }>(
    output: T,
): string => {
    const amounts = output?.amount || [];
    let result = '0';
    amounts.forEach((a) => {
        if (a.unit === 'lovelace') result = a?.quantity || '0';
    });
    return result;
};

export const locateUTxOWithAddress = <T extends BlockFrostOutput | AddressUTXO>(
    output: T[],
    targetAddress: string,
): T | undefined => output.find((o) => o.address === targetAddress);
export const locateUTxOWithPolicyId = <T extends BlockFrostOutput | AddressUTXO>(
    output: T[],
    targetPolicyId: string,
): T | undefined =>
    output.find((o) => o.amount?.findIndex((a) => a.unit?.startsWith(targetPolicyId)) !== -1);
export const locateUTxOWithAddressAndPolicyId = <T extends BlockFrostOutput | AddressUTXO>(
    output: T[],
    targetAddress: string,
    targetPolicyId: string,
): T | undefined => {
    const utxoAtAddress = locateUTxOWithPolicyId(output, targetPolicyId);
    if (utxoAtAddress) {
        return locateUTxOWithAddress([utxoAtAddress], targetAddress);
    }
    return undefined;
};

export const serializeBFUTxO = (bfData: AddressUTXO[]): [string[], string[]] => {
    const serUTxOs: string[] = [];
    const serCollateral: string[] = [];

    bfData.forEach((blockfrostUtxo) => {
        let lovelaceAmount = '0';
        const valueAmounts: OutputAmount[] = [];
        blockfrostUtxo.amount.forEach((asset) => {
            if (asset.unit === 'lovelace') {
                lovelaceAmount = asset.quantity;
            } else {
                valueAmounts.push(asset);
            }
        });

        const cslValue = csl.Value.new(csl.BigNum.from_str(lovelaceAmount));
        const cslMultiAsset = csl.MultiAsset.new();
        valueAmounts.forEach((asset) => {
            const cslAssets = csl.Assets.new();
            cslAssets.insert(
                csl.AssetName.new(Buffer.from(asset.unit.slice(56), 'hex')),
                csl.BigNum.from_str(asset.quantity),
            );
            cslMultiAsset.insert(csl.ScriptHash.from_hex(asset.unit.slice(0, 56)), cslAssets);
        });
        cslValue.set_multiasset(cslMultiAsset);

        const cslUtxo = csl.TransactionUnspentOutput.new(
            csl.TransactionInput.new(
                csl.TransactionHash.from_hex(blockfrostUtxo.tx_hash),
                blockfrostUtxo.tx_index,
            ),
            csl.TransactionOutput.new(csl.Address.from_bech32(blockfrostUtxo.address), cslValue),
        );
        serUTxOs.push(cslUtxo.to_hex());
        if (blockfrostUtxo.amount.length === 1 && serCollateral.length < 3) {
            serCollateral.push(cslUtxo.to_hex());
        }
    });

    return [serUTxOs, serCollateral];
};
