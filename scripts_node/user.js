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

const insertUserFromFollower = async (userData) => {
  const connection = await getConnection();

  try {
    await connection.query('INSERT INTO users (user_id, full_name, username, profile_pic_url) VALUES ?', [userData]);
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
  getUserByUserName,
  insertUserFromFollower,
}