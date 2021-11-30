const express = require('express'),
    router = express.Router(),
    config = require('config'),
    fs = require('file-system');

router.get('/api/currencies', (req, res) => {
    const all = {
        dir: JSON.parse(fs.readFileSync(config.get('database.NBRB_dir-currencies'), 'utf8')),
        daily: JSON.parse(fs.readFileSync(config.get('database.NBRB_all-courses-set-daily'), 'utf8')),
        monthly: JSON.parse(fs.readFileSync(config.get('database.NBRB_all-courses-set-monthly'), 'utf8')),
        allAlfaBank: JSON.parse(fs.readFileSync(config.get('database.AB_all-courses-set'), 'utf8'))
    };

    res.send(all);
});

module.exports = router;