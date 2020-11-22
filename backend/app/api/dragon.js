const {Router} = require('express');
const DragonTable = require('../dragon/table');
const {authenticatedAccount} = require('./helper');
const {getPublicDragons, getDragonWithTraits} = require('../dragon/helper');
const AccountDragonTable = require('../accountDragon/table');
const AccountTable = require('../account/table');
const Breeder = require('../dragon/breeder');

const router = new Router();

router.get('/new', (req, res, next) => {
    let accountId, dragon;

    authenticatedAccount(
        {sessionString: req.cookies.sessionString}
    )
        .then(({account}) => {
            accountId = account.id;
            dragon = req.app.locals.engine.generation.newDragon({accountId});
            return DragonTable.storeDragon(dragon);
        })
        .then(({dragonId}) => {
            dragon.dragonId = dragonId;
            return AccountDragonTable.storeAccountDragon(
                {accountId, dragonId});
        })
        .then(() => res.json({dragon}))
        .catch(error => console.error(error))

});

router.put('/update', (req, res, next) => {
    const {dragonId, nickname, isPublic, saleValue, sireValue} = req.body;
    DragonTable.updateDragon({dragonId, nickname, isPublic, saleValue, sireValue})
        .then(() => res.json({message: 'successfully updated dragon attributes'}))
        .catch(error => next(error));
});

router.get('/public-dragons', (req, res, next) => {
    getPublicDragons()
        .then((dragons) => res.json(dragons))
        .catch(error => next(error));
});

router.post('/buy', (req, res, next) => {
    const {dragonId, saleValue} = req.body;
    let buyerId;
    DragonTable.getDragon({dragonId})
        .then(dragon => {
            if (dragon.saleValue != saleValue) {
                throw new Error('Incorrect sale value');
            }
            if (!dragon.isPublic) {
                throw new Error('Dragon is not for sale');
            }

            return authenticatedAccount({sessionString: req.cookies.sessionString});
        })
        .then(({account, authenticated}) => {
            if (!authenticated) {
                throw new Error('Not Authenticated');
            }
            if (saleValue > account.balance) {
                throw new Error('Cannot afford dragon');
            }
            buyerId = account.id;
            return AccountDragonTable.getDragonAccount({dragonId});
        })
        .then(({accountId}) => {
            if (accountId === buyerId) {
                throw new Error('You already own that dragon');
            }
            const sellerId = accountId;

            return Promise.all([
                AccountTable.updateBalance({accountId: buyerId, saleValue: -saleValue}),
                AccountTable.updateBalance({accountId: sellerId, saleValue: saleValue}),
                AccountDragonTable.updateDragonAccount({dragonId: dragonId, accountId: buyerId}),
                DragonTable.updateDragon({dragonId, isPublic: false})
            ])
        })
        .then(() => res.json({message: 'success'}))
        .catch(error => next(error));
});

router.post('/mate', (req, res, next) => {
    const {matronDragonId, patronDragonId} = req.body;
    if (matronDragonId === patronDragonId) throw new Error('Cannot breed with the same dragon');
    let matronDragon, patronDragon, patronSireValue, matronAccountId, patronAccountId;

    console.log('mate: getting dragon with traits')
    getDragonWithTraits({dragonId: patronDragonId})
        .then(dragon => {
            if (!dragon.isPublic) {
                throw new Error('Patron is not public')
            }
            patronDragon = dragon;
            console.log('mate: found patron');
            return getDragonWithTraits({dragonId: matronDragonId})
        })
        .then(dragon => {
                matronDragon = dragon;
                console.log('mate: found matron');
                return authenticatedAccount({sessionString: req.cookies.sessionString});
            }
        )
        .then(({account, authenticated}) => {
            if (!authenticated) throw new Error('User not authenticated');
            patronSireValue = patronDragon.sireValue
            matronAccountId = account.id;
            if (patronSireValue > account.balance) throw new Error('Not enough credits to sire');
            return AccountDragonTable.getDragonAccount({dragonId: patronDragonId});
        })
        .then(({accountId}) => {
            patronAccountId = accountId;
            if (matronAccountId === patronAccountId) throw new Error('Cannot breed your own dragons');
            const baby = Breeder.breedDragon({matron: matronDragon, patron: patronDragon});
            return DragonTable.storeDragon(baby);
        })
        .then(({dragonId}) => {
            Promise.all([
                AccountTable.updateBalance({accountId: matronAccountId, saleValue: -patronSireValue}),
                AccountTable.updateBalance({accountId: patronAccountId, saleValue: patronSireValue}),
                AccountDragonTable.storeAccountDragon({dragonId: dragonId, accountId: matronAccountId})
            ]).then(() => res.json({message: 'Breeding Success'}))
        })
        .catch(error => console.log(error));

})
module.exports = router;