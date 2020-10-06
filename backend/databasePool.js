const {Pool} = require('pg');
const dbConf = require('./sec/dbConf')
const pool = Pool(dbConf);

module.exports = pool;

// pool.query('SELECT 43535 FROM generation', (error, response) => {
//     if (error) return console.log('error', error);
//     console.log(response.rows);
// })