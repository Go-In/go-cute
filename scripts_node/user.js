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

const insertUserFromFollower = async (userData, connection) => {
  try {
    await connection.beginTransaction();
    await connection.query('INSERT INTO users (user_id, full_name, username, profile_pic_url) VALUES ?', [userData]);
    await connection.commit();
  } catch (err) {
    await connection.rollback();
    console.log(err)
    throw err;
  }
}
const findUserNotFetchToFetch = async (connection) => {
  try {
    await connection.beginTransaction();
    const [rows] = await connection.query('SELECT `user_id`, `username` from `users` WHERE `is_fetch` = FALSE LIMIT 1');
    await connection.query('UPDATE users SET `is_fetch` = 1 WHERE `user_id` = ?', [rows[0].user_id])
    await connection.commit();
    return rows[0];
  } catch(err) {
    await connection.rollback();
  }
}
const findUserNotSearch = async (connection) => {
  try {
    const [rows] = await connection.query('SELECT `user_id`, `username` from `users` WHERE is_private is NULL LIMIT 1');
    return rows[0];
  } catch(err) {
    console.log(err);
  }
}

const checkUserExited = async (id, connection) => {
  try {
    const [rows] = await connection.query('SELECT EXISTS(SELECT 1 FROM `users` WHERE `user_id` = ? LIMIT 1)', [id]);
    return Object.values(rows[0])[0] === 1;
  } catch(err) {
    throw err;
  }
}

const updateUserById = async (payload, connection) => {
  console.log(payload);
  try {
    await connection.query(' UPDATE users SET full_name = ?, username = ?, biography = ?, edge_followed_by = ?, edge_follow = ?, profile_pic_url = ?, is_private = ?, media_count = ? WHERE user_id = ?',
    [
      payload.full_name,
      payload.username,
      payload.biography,
      payload.edge_followed_by,
      payload.edge_follow,
      payload.profile_pic_url,
      payload.is_private ? 1 : 0,
      payload.media_count,
      payload.user_id,
    ])
    await connection.commit();
    console.log(`updated, ${payload.username}`)
  } catch(err) {
    console.log(err);
    throw err;
    await connection.rollback();
  }
}

module.exports = {
  getUserById,
  insertUser,
  getUserByUserName,
  insertUserFromFollower,
  findUserNotFetchToFetch,
  checkUserExited,
  updateUserById,
  findUserNotSearch,
}