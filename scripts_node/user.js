const mysql = require('mysql2/promise');
const getConnection = require('./connection');

const getUserById = async (id) => {
  const connection = await getConnection();
  try {
    const [rows] = await connection.query('SELECT * FROM `users` WHERE `id` = ?', [id]);
    await connection.end();
    return rows[0];
  } catch(err) {
    throw err;
  }
}

const insertUser = async (userData) => {
  const connection = await getConnection();

  try {
    await connection.query('INSERT INTO users SET ?', userData);
    console.log('user data saved.');
    await connection.end();
  } catch (err) {
    console.log(err)
    throw err;
  }
}

module.exports = {
  getUserById,
  insertUser,
}