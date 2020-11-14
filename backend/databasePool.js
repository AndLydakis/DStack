const {Pool} = require('pg');
const dbConf = require('./sec/dbConf')
const pool = Pool(dbConf);

module.exports = pool;
