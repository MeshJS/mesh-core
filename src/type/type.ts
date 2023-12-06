export type ConStr<N, T> = { constructor: N; fields: T };
export type ConStr0<T> = ConStr<0, T>;
export type ConStr1<T> = ConStr<1, T>;
export type ConStr2<T> = ConStr<2, T>;
export type BuiltinByteString = { bytes: string };
export type Integer = { int: number };
export type ValidatorHash = BuiltinByteString;
export type PaymentPubKeyHash = BuiltinByteString;
export type PubKeyHash = PaymentPubKeyHash;
export type POSIXTime = Integer;
export type MaybeStakingHash = ConStr1<[]> | ConStr0<[ConStr0<[ConStr0<[BuiltinByteString]>]>]>;
export type PubKeyAddress = ConStr0<[ConStr0<[PubKeyHash]>, MaybeStakingHash]>;
export type ScriptAddress = ConStr0<[ConStr1<[ValidatorHash]>, MaybeStakingHash]>;
export type AssetClass = ConStr0<[{ bytes: string }, { bytes: string }]>;
export type TxOutRef = ConStr0<[ConStr0<[BuiltinByteString]>, Integer]>;
export type AssocMapItem<K, V> = { k: K; v: V };
export type AssocMap<K, V> = { map: AssocMapItem<K, V>[] };
export type Tuple<K, V> = ConStr0<[K, V]>;
export type PlutusData =
    | BuiltinByteString
    | Integer
    | MaybeStakingHash
    | PubKeyAddress
    | ScriptAddress
    | AssetClass
    | PaymentPubKeyHash
    | PubKeyHash
    | POSIXTime
    | TxOutRef;
