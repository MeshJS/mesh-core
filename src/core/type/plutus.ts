/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */

export type ConStr<N = any, T = any> = { constructor: N; fields: T };
export type ConStr0<T = any> = ConStr<0, T>;
export type ConStr1<T = any> = ConStr<1, T>;
export type ConStr2<T = any> = ConStr<2, T>;
export type Bool = ConStr0<[]> | ConStr1<[]>;
export type BuiltinByteString = { bytes: string };
export type Integer = { int: number };
export type List = { list: PlutusData[] };
export type ValidatorHash = BuiltinByteString;
export type PaymentPubKeyHash = BuiltinByteString;
export type PubKeyHash = PaymentPubKeyHash;
export type POSIXTime = Integer;
export type CurrencySymbol = BuiltinByteString;
export type TokenName = BuiltinByteString;
export type MaybeStakingHash = ConStr1<[]> | ConStr0<[ConStr0<[ConStr0<[BuiltinByteString]>]>]>;
export type PubKeyAddress = ConStr0<[ConStr0<[PubKeyHash]>, MaybeStakingHash]>;
export type ScriptAddress = ConStr0<[ConStr1<[ValidatorHash]>, MaybeStakingHash]>;
export type AssetClass = ConStr0<[CurrencySymbol, TokenName]>;
export type TxOutRef = ConStr0<[ConStr0<[BuiltinByteString]>, Integer]>;
export type AssocMapItem<K, V> = { k: K; v: V };
export type DictItem<K, V> = { k: K; v: V };
export type AssocMap<K, V> = { map: AssocMapItem<K, V>[] };
export type Dict<K, V> = { map: DictItem<K, V>[] };
export type Tuple<K, V> = ConStr0<[K, V]>;
export type Value = AssocMap<CurrencySymbol, AssocMap<TokenName, Integer>>;
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
