import {
  getCurrency
} from '../../../helpers/currencies/NBRB';

import {
  generateID
} from '../../../helpers/generateID';

import InputSelect from '../../../../templates/pages/converter/input-select';

import Currencies from '../../../models/currencies';
import Calculator from './calculator';

class SidebarInputSelect extends Currencies {

  constructor() {
    super();

    this.calc = new Calculator();
  }

  render() {
    return new Promise(resolve => resolve(InputSelect({
      id: generateID(),
      db: getCurrency(),
      usd: getCurrency('USD')
    })));
  }
}

export default SidebarInputSelect;