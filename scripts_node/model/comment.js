const mysql = require('mysql2/promise');
const getConnection = require('../connection');

const insertCommentFromShortCode = async (payload) => {
  const connection = await getConnection();
//   console.log(connection);
  const sql = "INSERT INTO comment (short_code, user_id, comment_id, commentator_id, comment, timestamp) VALUES ?";
  console.log("Hello");
  try {
    console.log("Test");
    await connection.query(sql, [payload]);
    //'INSERT INTO post (user_id) VALUES ?'
    console.log("Test2");
    //[[[payload[0][0], payload[0][1]]]]
    await connection.end();
  } catch (err) {
    throw err;
  }
  console.log("wtf");
}

module.exports = {
    insertCommentFromShortCode
}