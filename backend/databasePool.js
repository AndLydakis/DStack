const {Pool} = require('pg');
const dbConf = require('./confidential/databaseConfiguration.js')
const pool = new Pool(dbConf);

module.exports = pool;

