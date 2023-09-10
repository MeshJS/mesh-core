import csl from '@emurgo/cardano-serialization-lib-nodejs';

export class SidanValue {
  self: csl.MultiAsset;

  constructor() {
    this.self = csl.MultiAsset.new();
  }

  withLovelace = (lovelace: string) =>
    csl.Value.new_with_assets(
      csl.BigNum.from_str(lovelace),
      this.self
    );

  return = () => this.self;

  add = (policyId: string, tokenName: string, quantity: string) => {
    const cslAssets = csl.Assets.new();
    cslAssets.insert(
      csl.AssetName.new(Buffer.from(tokenName, 'utf-8')),
      csl.BigNum.from_str(quantity)
    );
    this.self.insert(
      csl.ScriptHash.from_hex(policyId),
      cslAssets
    );
    return this
  }
}
