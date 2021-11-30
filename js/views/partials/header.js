import {
    getCurrency
} from '../../helpers/currencies/NBRB';

import HeaderTemplate from '../../../templates/partials/header';

class Header {
    render() {
        return new Promise(resolve => {
            resolve(HeaderTemplate({
                usd: getCurrency('USD'),
                eur: getCurrency('EUR'),
                rub: getCurrency('RUB'),
                pln: getCurrency('PLN')
            }));
        });
    }
}

export default Header;