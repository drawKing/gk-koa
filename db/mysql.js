const Mysql = require('node-mysql-promise');
const {MYSQL_CONF} = require('../conf/db');

module.exports = Mysql.createConnection(MYSQL_CONF);
