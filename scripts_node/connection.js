const mysql = require('mysql2/promise');
require('dotenv').config();
const getConnection = async () => {
  const connection = await mysql.createConnection({
    host: process.env.HOSTNAME,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DB_NAME,
  });
  return connection;
}

module.exports = getConnection;
