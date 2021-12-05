import '../styles/app';

import Header from './views/partials/header';
import Footer from './views/partials/footer';
import BankInfoHead from './views/pages/converter/bank-info-head';
import Sidebar from './views/pages/converter/sidebar';
import Calculator from './views/pages/converter/calculator';
import RatesTable from './views/pages/converter/rates-table';

import Currencies from './models/requests';

function router() {
    const headerContainer = document.getElementsByTagName('header')[0],
        footerContainer = document.getElementsByTagName('footer')[0],
        contentContainer = document.getElementsByClassName('converter content')[0],
        sidebarContainer = document.getElementsByClassName('converter sidebar')[0],
        header = new Header(),
        content = new BankInfoHead(),
        sidebar = new Sidebar(),
        footer = new Footer(),
        calculator = new Calculator(),
        currencies = new Currencies(),
        ratesTable = new RatesTable();

    currencies.getCurrenciesValueFromBanks()
        .then(() => currencies.getCurrList().then(db => {
            function srt(a, b) {
                if (a.Cur_Abbreviation > b.Cur_Abbreviation) {
                    return 1;
                }
                if (a.Cur_Abbreviation < b.Cur_Abbreviation) {
                    return -1;
                }
                return 0;
            }

            db = {
                dir: db.dir.sort(srt),
                daily: db.daily.sort(srt),
                monthly: db.monthly.sort(srt),
                allAlfaBank: db.allAlfaBank
            };

            localStorage.setItem('db', JSON.stringify(db));

        }))
        .then(() => header.render().then(html => headerContainer.innerHTML = html))
        .then(() => content.render().then(html => contentContainer.innerHTML = html))
        .then(() => sidebar.render().then(html => sidebarContainer.innerHTML = html))
        .then(() => calculator.setActions())
        .then(() => ratesTable.render().then(html => contentContainer.innerHTML += html))
        .then(() => footer.render().then(html => footerContainer.innerHTML = html));
}

module.hot ? module.hot.accept(router()) : window.addEventListener('load', router);
window.addEventListener('hashchange', router);