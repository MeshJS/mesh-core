export interface UTXO {
    tx_hash: string;
    tx_index: number;
    block_height: number;
    block_time: number;
}
export interface OutputAmount {
    unit: string;
    quantity: string;
}
export interface TransactionUTXO {
    hash: string;
    block: string;
    block_height: number;
    block_time: number;
    slot: number;
    index: number;
    output_amount: OutputAmount[];
    fees: string;
    deposit: string;
    size: number;
    invalid_before: string;
    invalid_hereafter: string;
    utxo_count: number;
    withdrawal_count: number;
    mir_cert_count: number;
    delegation_count: number;
    stake_cert_count: number;
    pool_update_count: number;
    pool_retire_count: number;
    asset_mint_or_burn_count: number;
    redeemer_count: number;
    valid_contract: boolean;
}

export interface BlockFrostOutput {
    [x: string]: unknown;
    address?: string | undefined;
    amount?:
        | {
              [x: string]: unknown;
              unit?: string | undefined;
              quantity?: string | undefined;
          }[]
        | undefined;
    output_index?: number | undefined;
    collateral?: boolean | undefined;
    data_hash?: string | undefined;
    inline_datum?: string | undefined;
}

export interface TxHashUTXO {
    hash: string;
    inputs: BlockFrostOutput[];
    outputs: BlockFrostOutput[];
}

export interface AddressUTXO {
    address: string;
    tx_hash: string;
    tx_index: number;
    output_index: number;
    amount: OutputAmount[];
    block: string;
    data_hash: string | undefined;
    inline_datum: string | undefined;
    reference_script_hash: string | undefined;
}

export interface AssetDetails<T> {
    asset: string;
    policy_id: string;
    asset_name: string;
    fingerprint: string;
    quantity: string;
    initial_mint_tx_hash: string;
    mint_or_burn_count: number;
    onchain_metadata: T;
    onchain_metadata_standard: string;
    onchain_metadata_extra: null;
    metadata: null;
}

export interface AssetTx {
    tx_hash: string;
    tx_index: number;
    block_height: number;
    block_time: number;
}
