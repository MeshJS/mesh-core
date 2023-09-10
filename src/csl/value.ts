import csl from '@emurgo/cardano-serialization-lib-nodejs';

export class SidanValue {
  self: csl.Value;
  multiAsset: csl.MultiAsset;

  constructor(coin: string) {
    this.self = csl.Value.new(csl.BigNum.from_str(coin));
    this.multiAsset = csl.MultiAsset.new();
  };

  return = () => { 
    this.self.set_multiasset(this.multiAsset);
    return this.self;
  };

  add = (policyId: string, tokenName: string, quantity: string) => {
    const cslAssets = csl.Assets.new();
    cslAssets.insert(
      csl.AssetName.new(Buffer.from(tokenName, 'utf-8')),
      csl.BigNum.from_str(quantity)
    );
    this.multiAsset.insert(
      csl.ScriptHash.from_hex(policyId),
      cslAssets
    );
    return this;
  }
}
