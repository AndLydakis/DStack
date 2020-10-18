const pool = require('../../databasePool');

class AccountTable {
    static storeAccount({usernameHash, passwordHash}) {
        return new Promise(
            (resolve, reject) => {
                pool.query('INSERT INTO account("usernameHash", "passwordHash")' +
                    ' VALUES($1, $2)' +
                    ' RETURNING id',
                    [
                        usernameHash,
                        passwordHash
                    ],
                    (error, response) => {
                        if (error) return reject(error);
                        const accountId = response.rows[0].id;
                        console.log('Stored account ', accountId);
                        return resolve({accountId});
                    }
                )
            }
        )
    }

    // static getDragon({dragonId}) {
    //     return new Promise((resolve, reject) => {
    //         pool.query('SELECT birthdate, nickname, "generationId"' +
    //             ' FROM dragon ' +
    //             'WHERE dragon.id=$1',
    //             [dragonId],
    //             (error, response) => {
    //                 if (error) return reject(error);
    //                 if (response.rows.length === 0) reject(new Error('No dragon found'));
    //                 resolve(response.rows[0]);
    //             })
    //     })
    // }
}

module.exports = AccountTable;