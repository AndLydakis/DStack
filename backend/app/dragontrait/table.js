const pool = require('../../databasePool');
const TraitTable = require('../trait/table');

class DragonTraitTable {
    static storeDragonTrait({dragonId, traitType, traitValue}) {
        return new Promise(((resolve, reject) => {
            TraitTable.getTraitId({traitType, traitValue})
                .then(({traitId}) => {
                    pool.query('INSERT INTO dragontrait("dragonId","traitId")' +
                        ' VALUES($1, $2)',
                        [dragonId, traitId],
                        (error, response) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve();
                            }
                        })
                })
                .catch(err => reject(err));
        }))
    }

}

module.exports = DragonTraitTable;