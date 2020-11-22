const pool = require('../../databasePool');
const {STARTING_BALANCE} = require('../config');

class AccountTable {
    static storeAccount({usernameHash, passwordHash}) {
        return new Promise(
            (resolve, reject) => {
                pool.query('INSERT INTO account("usernameHash", "passwordHash", balance)' +
                    ' VALUES($1, $2, $3)' +
                    ' RETURNING id',
                    [
                        usernameHash,
                        passwordHash,
                        STARTING_BALANCE
                    ],
                    (error, response) => {
                        if (error) return reject(error);
                        const accountId = response.rows[0].id;
                        return resolve({accountId});
                    }
                )
            }
        )
    }

    static getAccount({usernameHash}) {
        return new Promise((resolve, reject) => {
            pool.query(
                'SELECT id, "passwordHash", "sessionId", balance ' +
                'FROM account ' +
                'WHERE "usernameHash" = $1',
                [usernameHash],
                (error, response) => {
                    if (error) return reject(error);
                    resolve({account: response.rows[0]});
                }
            )
        })
    }

    static updateSessionId({sessionId, usernameHash}) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE account ' +
                'SET "sessionId" = $1' +
                ' WHERE "usernameHash" = $2',
                [
                    sessionId, usernameHash
                ],
                (error, response) => {
                    if (error) return reject(error);
                    resolve();
                })
        })
    }

    static updateBalance({accountId, saleValue}) {
        return new Promise((resolve, reject) => {
            pool.query(
                'UPDATE account ' +
                'SET balance = balance + $2 ' +
                'WHERE id = $1',
                [accountId, saleValue],
                (error, response) => {
                    if (error) return reject(error);
                    resolve();
                }
            )
        })
    }
}

module.exports = AccountTable;