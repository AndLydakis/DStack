const pool = require('../../databasePool.js');
const TraitTable = require('../trait/table.js');

class DragonTraitTable{
    static storeTragonTrait({dragonId, traitType, traitValue}){

        return new Promise(((resolve, reject) => {
            TraitTable.getTraitId({traitType, traitValue})
                .then(({traitId})=>{
                    pool.query(`INSERT INTO dragonTrait("traitId", "dragonId")
                                VALUES ($1,$2)`,
                        [
                            traitId,
                            dragonId
                        ],
                        (error, response)=>{
                            if (error) return reject(error);
                            console.log('Successfully inserted new dragontrait in database');
                            resolve({});
                        })
                })
                .catch((error)=>{console.log('Error ', error)})
        }))

    }

}

module.exports = DragonTraitTable;