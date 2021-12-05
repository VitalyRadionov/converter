import {
  getCurrencyAB
} from '../../../helpers/currencies/Alfa';

import RatesTableTemplate from '../../../../templates/pages/converter/rates-table';

class RatesTable {

  render() {
    return new Promise(resolve => {
      resolve(RatesTableTemplate({
        alfaBank: {
          name: 'Альфа-Банк',
          usd: getCurrencyAB('USD'),
          eur: getCurrencyAB('EUR'),
          rub: getCurrencyAB('RUB')
        }
      }));
    });
  }
}

export default RatesTable;