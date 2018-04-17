const mysql = require('mysql2/promise');
const getConnection = require('../connection');

const getUserRelationById = async (id) => {
  const connection = await getConnection();
  try {
    const [rows] = await connection.query('SELECT * FROM `user_relations` WHERE `id` = ?', [id]);
    await connection.end();
    return rows[0];
  } catch(err) {
    throw err;
  }
}

const insertUserRelations = async (followerData) => {
  const connection = await getConnection();

  try {
    await connection.query('INSERT INTO user_relations (user_id, followed, username) VALUES ?', [followerData]);
    console.log('follower data saved.');
    await connection.end();
  } catch (err) {
    console.log(err)
    throw err;
  }
}

module.exports = {
  getUserRelationById,
  insertUserRelations,
}