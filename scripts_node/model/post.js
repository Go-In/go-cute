const mysql = require('mysql2/promise');
const getConnection = require('../connection');

const insertPostFromUserID = async (payload) => {
  const connection = await getConnection();
//   console.log(connection);
  const sql = "INSERT INTO post (user_id, post_id, type_name, caption, display_url, comment_count, shortcode) VALUES ?";
  console.log("Hello");
  try {
    console.log("Test");
    await connection.query('INSERT INTO post (user_id, post_id, type_name, caption, display_url, comment_count, shortcode) VALUES ?', [payload]);
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
  insertPostFromUserID
}