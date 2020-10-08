const Dragon = require('./index')
const DragonTable = require('./table');
const pool = require('../../databasePool');

const getDragonWithTraits = ({dragonId}) => {

    return Promise.all([
        DragonTable.getDragon({dragonId}),
        new Promise((resolve, reject) => {
            pool.query('SELECT "traitType", "traitValue"' +
                ' FROM trait ' +
                'INNER JOIN dragonTrait ON trait.id=dragonTrait."traitId" ' +
                'WHERE dragonTrait."dragonId" = $1',
                [dragonId],
                (error, response) => {
                    if (error) {
                        console.log(`Could not get dragon with traits (id: ${dragonId})`);
                        return reject(error);
                    }
                    resolve(response.rows);
                })
        })
    ])
        .then(([dragon, traits]) => {
            return new Dragon({...dragon, dragonId, traits: traits});
        })
        .catch(error => console.log('error storing dragon with traits'));
}

module.exports = getDragonWithTraits;

getDragonWithTraits({dragonId: 1}).then(dragon => console.log(dragon)).catch(error => console.error(error));