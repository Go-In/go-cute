const mysql = require('mysql2/promise');
const getConnection = require('../connection');

const insertLikesFromPost = async (payload) => {
  const connection = await getConnection();
  try {
    await connection.query('INSERT INTO likes (post_id, owner_id, user_id) VALUES ?', [payload]);
    await connection.end();
  } catch (err) {
    throw err;
  }
}

module.exports = {
  insertLikesFromPost
}