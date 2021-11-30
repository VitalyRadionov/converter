import {
  getDate
} from '../../../helpers/date';

import {
  getCurrency
} from '../../../helpers/currencies/NBRB';

import {
  getCurrencyAB
} from '../../../helpers/currencies/Alfa';

import BankInfoHeadTemplate from '../../../../templates/pages/converter/bank-info-head';

class BankInfoHead {

  render() {
    return new Promise(resolve => {
      resolve(BankInfoHeadTemplate({
        date: getDate(),
        nbrb: {
          usd: getCurrency('USD'),
          eur: getCurrency('EUR'),
          rub: getCurrency('RUB'),
          pln: getCurrency('PLN')
        },
        alfaBank: {
          usd: getCurrencyAB('USD'),
          eur: getCurrencyAB('EUR'),
          rub: getCurrencyAB('RUB')
        }
      }));
    });
  }
}

export default BankInfoHead;