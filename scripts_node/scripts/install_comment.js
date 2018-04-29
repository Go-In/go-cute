const mysql = require('mysql2');
const getConnection = require('../connection');

const main = async () => {
  const connection = await getConnection();

  const sqlCommand = `CREATE TABLE comment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    comment_id VARCHAR(255),
    commentor_id VARCHAR(255),
    text VARCHAR(511),
    commented_id VARCHAR(255),
    created_at VARCHAR(255),
    post_shortcode VARCHAR(255)
  )`;

  try {
    await connection.execute(sqlCommand);
    await connection.execute('ALTER TABLE comment CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin');
  } catch (err) {
    console.log(err);
  }
  
  connection.end();
}

main();