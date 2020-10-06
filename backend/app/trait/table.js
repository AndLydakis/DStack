const pool = require('../../databasePool')

class TraitTable {
    static getTraitId({traitType, traitValue}) {

        return new Promise((resolve, reject) => {
            pool.query('SELECT id FROM trait ' +
                'WHERE "traitType"=$1 AND "traitValue"=$2',
                [traitType, traitValue],
                (error, response) => {
                    if (error) reject(error);
                    const traitId = response.rows[0].id;
                    console.log('Retrieved trait id: ', traitId);
                    resolve({traitId: traitId});
                })
        });
    }
}

module.exports = TraitTable;