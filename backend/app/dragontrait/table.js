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
                                console.error('Error storing dragonTrait');
                                reject(error);
                            } else {
                                console.log('DragonTrait stored successfully');
                                resolve();
                            }
                        })
                })
                .catch(err => reject(err));
        }))
    }

}

module.exports = DragonTraitTable;