const {Router} = require('express');
const AccountTable = require('../account/table.js');
const {hash} = require('../account/helper.js')

const router = new Router();

router.post('/signup', (req, res, next) => {
    const {username, password} = req.body;
    const unHash = hash(username);
    const pwHash = hash(password);

    AccountTable.storeAccount({unHash, pwHash})
        .then(({accountId}) => {
            console.log('accountId', accountId);
            res.json({message: 'Insert Account Success'});
        })
        .catch(error => {
            console.log('Error inserting account into db: ', error);
            next(error);
        })
});

module.exports = router;