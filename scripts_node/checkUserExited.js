const mysql = require('mysql2/promise');
const getConnection = require('./connection');

const checkUserExited = async (id) => {
  const connection = await getConnection();
  try {
    const [rows] = await connection.query('SELECT EXISTS(SELECT 1 FROM `users` WHERE `user_id` = ? LIMIT 1)', [id]);
    await connection.end();
    return Object.values(rows[0])[0] === 1;
  } catch(err) {
    throw err;
  }
}

module.exports = {
  checkUserExited
}