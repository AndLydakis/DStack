const pool = require('../databasePool.js');
const TRAITS = require('../data/traits.json');

TRAITS.forEach(TRAIT=>{
    const traitType = TRAIT.type;
    const traitValues = TRAIT.values;
    traitValues.forEach(traitValue=>{
        return new Promise((resolve, reject) =>{
            pool.query(`INSERT INTO trait("traitType", "traitValue")
                        VALUES($1, $2)
                         RETURNING id`,
                [
                    traitType,
                    traitValue
                ],
                (error, response)=>{
                    if (error) return reject(error);
                    console.log('Successfully inserted new trait in database');
                    const traitId = response.rows[0].id;
                    resolve({ traitId});
                })
        })
    })
})