const pool = require('../../databasePool')

class GenerationTable {
    static storeGeneration(generation) {

        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO generation(expiration)' +
                ' VALUES($1) RETURNING id',
                [generation.expiration],
                (error, response) => {
                    if (error) reject(error);
                    const generationId = response.rows[0].id;
                    console.log('Generation stored successfully: ', generationId);
                    resolve({generationId});
                })
        });
    }
}

module.exports = GenerationTable;