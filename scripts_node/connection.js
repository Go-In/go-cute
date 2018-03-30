const mysql = require('mysql2');

const getConnection = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'go-cute',
  });
  return connection;
}

module.exports = getConnection;
