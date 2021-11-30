const express = require('express'),
    router = express.Router(),
    config = require('config'),
    fs = require('file-system'),
    shortId = require('shortid');

router.put('/api/curr/:str', (req, res) => {
    const url = req.url;
    switch (true) {
        case url == '/api/curr/dir':
            setCurrToDB(req.body, 'NBRB_dir-currencies');
            break;
        case url == '/api/curr/daily':
            setCurrToDB(req.body, 'NBRB_all-courses-set-daily');
            break;
        case url == '/api/curr/monthly':
            setCurrToDB(req.body, 'NBRB_all-courses-set-monthly');
            break;
        case url == '/api/curr/AB':
            setCurrToDB(req.body, 'AB_all-courses-set');
            break;
    }

    res.sendStatus(204);
});

function setCurrToDB(currData, str) {
    fs.writeFileSync(config.get(`database.${str}`), JSON.stringify(currData));
}

module.exports = router;