class Currencies {

    getCurrenciesValueFromBanks() {
        return new Promise(resolve => {
            this.getDirCurrFromNBRB().then(d => this.sendToServer(d, 'dir'));
            this.getCurrDailyFromNBRB().then(d => this.sendToServer(d, 'daily'));
            this.getCurrMonthlyFromNBRB().then(d => this.sendToServer(d, 'monthly'));
            this.getCurrenciesFromAlfaBank().then(d => this.sendToServer(d, 'AB'));

            resolve();
        });
    }

    getCurrenciesFromAlfaBank() {
        return new Promise(resolve => {
            fetch('https://developerhub.alfabank.by:8273/partner/1.0.1/public/rates')
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    let d = JSON.stringify(data.rates.filter(el => el.buyIso.includes('BYN') == true));
                    resolve(d);
                });
        });
    }

    getDirCurrFromNBRB() {
        return new Promise(resolve => {
            fetch('https://www.nbrb.by/api/exrates/currencies')
                .then(response => {
                    return response.json();
                })
                .then((data) => {
                    let d = JSON.stringify(data.filter(el => el.Cur_DateEnd.includes('2050') == true));
                    resolve(d);
                })
                .catch(err => alert(`Данные не получены \n${err}`));
        });
    }

    getCurrDailyFromNBRB() {
        return new Promise(resolve => {
            fetch('https://www.nbrb.by/api/exrates/rates?periodicity=0')
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    resolve(JSON.stringify(data));
                })
                .catch(err => alert(`Данные не получены \n${err}`));
        });
    }

    getCurrMonthlyFromNBRB() {
        return new Promise(resolve => {
            fetch('https://www.nbrb.by/api/exrates/rates?periodicity=1')
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    let d = JSON.stringify(data);
                    resolve(d);
                })
                .catch(err => alert(`Данные не получены \n${err}`));
        });
    }

    sendToServer(newCurr, str) {
        return new Promise(resolve => {
            fetch(`http://localhost:3000/api/curr/${str}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: newCurr
            })
                .then(() => {
                    resolve();
                })
                .catch(err => alert(`Данные не отправлены на сервер \n${err}`));
        });
    }

    getCurrList() {
        return new Promise(resolve => {

            fetch('http://localhost:3000/api/currencies')
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    let d = data;
                    resolve(d);
                })
                .catch(err => alert(`Данные не получены с сервера \n${err}`));
        });
    }
}

export default Currencies;