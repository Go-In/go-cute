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
const getUserByUserName = async (username) => {
  const connection = await getConnection();
  try {
    const [rows] = await connection.query('SELECT * FROM `users` WHERE `username` = ?', [username]);
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

const findUserNotFetchToFetch = async () => {
  const connection = await getConnection();
  try {
    await connection.beginTransaction();
    const [rows] = await connection.query('SELECT `user_id` from `users` WHERE `fetch` = FALSE LIMIT 1');
    await connection.query('UPDATE users SET `fetch` = 1 WHERE `user_id` = ?', [rows[0].user_id])
    await connection.commit();
    await connection.end();
    return rows[0].user_id;
  } catch(err) {
    await connection.rollback();
    await connection.end();
  }
}

module.exports = {
  getUserById,
  insertUser,
  getUserByUserName,
  findUserNotFetchToFetch,
}