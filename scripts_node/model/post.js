const mysql = require('mysql2/promise');
const getConnection = require('../connection');

const insertPostFromUserID = async (payload) => {
  const connection = await getConnection();
//   console.log(connection);
  const sql = "INSERT INTO post (user_id, post_id, type_name, caption, display_url, comment_count, like_count, shortcode, timestamp, total_post) VALUES ?";
  // console.log("Hello");
  try {
    await connection.query(sql, [payload]);
    await connection.end();
    console.log("Success !!")
  } catch (err) {
    throw err;
  }
  // console.log("wtf");
}

const getShortCode = async (user_id) => {
  const connection = await getConnection();
  const sqlCommand = "SELECT shortcode, user_id FROM post WHERE post.timestamp > 1522515600 && post.user_id = ?;"
  var result;
  try {
    // console.log("SELECT FROM TABLE POST","Hello");
    // console.log(connection.query(sqlCommand, '4636716008'));
    result = await connection.query(sqlCommand, user_id);
    await connection.end();

  } catch (err) {
    throw err;
  }
  // console.log(result[0][0].user_id)
  return result;
}

module.exports = {
  insertPostFromUserID,
  getShortCode

}