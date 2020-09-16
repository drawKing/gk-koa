const Mysql = require('node-mysql-promise');
const {MYSQL_CONF} = require('../conf/db');

const mysql = Mysql.createConnection(MYSQL_CONF);

module.exports = {
    mysql,
};
