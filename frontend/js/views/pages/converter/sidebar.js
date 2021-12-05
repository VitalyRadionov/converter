import {
  getCurrency
} from '../../../helpers/currencies/NBRB';

import {
  generateID
} from '../../../helpers/generateID';

import SidebarTemplate from '../../../../templates/pages/converter/sidebar';

import Currencies from '../../../models/requests';
import Calculator from './calculator';

class Sidebar extends Currencies {

  constructor() {
    super();

    this.calc = new Calculator();
  }

  render() {
    return new Promise(resolve => resolve(SidebarTemplate({
      id: generateID(),
      db: getCurrency(),
      usd: getCurrency('USD')
    })));
  }
}

export default Sidebar;