import csl from '@emurgo/cardano-serialization-lib-nodejs';

export class SidanTxBuilder {
  self: csl.TransactionBuilder

  constructor() {
    this.self = csl?.TransactionBuilder.new(
      csl.TransactionBuilderConfigBuilder.new()
        .fee_algo(csl.LinearFee.new(csl.BigNum.from_str('44'), csl.BigNum.from_str('155381')))
        .coins_per_utxo_byte(csl.BigNum.from_str('4310'))
        .pool_deposit(csl.BigNum.from_str('500000000'))
        .key_deposit(csl.BigNum.from_str('2000000'))
        .ex_unit_prices(
          csl.ExUnitPrices.new(
            csl.UnitInterval.new(csl.BigNum.from_str('577'), csl.BigNum.from_str('10000')),
            csl.UnitInterval.new(
              csl.BigNum.from_str('721'),
              csl.BigNum.from_str('10000000'),
            ),
          ),
        )
        .max_value_size(5000)
        .max_tx_size(16384)
        .build(),
    );
  };

  return = () => {
    return this.self;
  };

  addOutput = () => {

  };
}