const pool = require('../../databasePool.js')

const DragonTraitTable = require('../dragontrait/table.js');


class DragonTable {

    static storeDragon(dragon) {

        const {birthdate, nickname, generationId} = dragon;
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO dragon(birthdate, nickname, "generationId")
                        VALUES ($1, $2, $3)
                        RETURNING id`,
                [
                    birthdate,
                    nickname,
                    generationId
                ],
                (error, response) => {
                    if (error) return reject(error);
                    console.log('Successfully inserted new dragon in database');
                    const dragonId = response.rows[0].id;

                    Promise.all(dragon.traits.map(({traitType, traitValue}) => {
                        return DragonTraitTable.storeTragonTrait({
                            dragonId, traitType, traitValue
                        });
                    }))
                        .then(() => resolve({dragonId}))
                        .catch((error) => reject(error))
                })
        });
    }

    static getDragon({dragonId}) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT birthdate, nickname, "generationId"
                        from dragon
                        WHERE dragon.id = $1`,
                [dragonId],
                (error, response) => {
                    if (error) return reject(error);
                    if (response.rows.length === 0) return reject(new Error('No dragons returned'));
                    resolve(response.rows[0]);
                })
        })
    }
}

// DragonTable.getDragon({dragonId: 1})
//     .then (dragon=>console.log(dragon))
//     .catch(err=>console.log('error', err));
module.exports = DragonTable;