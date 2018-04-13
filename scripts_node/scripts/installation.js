const mysql = require('mysql2');
const getConnection = require('../connection');

const main = async () => {
  const connection = await getConnection();

  const createUserTableSql = `CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255),
    full_name VARCHAR(255) CHARACTER SET utf8mb4,
    username VARCHAR(255) CHARACTER SET utf8mb4,
    biography VARCHAR(255) CHARACTER SET utf8mb4,
    edge_followed_by INT,
    edge_follow INT,
    is_private BOOLEAN,
    profile_pic_url VARCHAR(255) CHARACTER SET utf8,
    media_count INT,
    is_fetch BOOLEAN DEFAULT 0
  )`;
  try {
    await connection.execute(createUserTableSql);
    console.log('created users table.');
  } catch(err) {
    console.log(err);
  }

  const createUserRelationTableSql = `CREATE TABLE user_relations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255),
    followed VARCHAR(255),
    username VARCHAR(255)
  )`;
  try {
    await connection.execute(createUserRelationTableSql)
    console.log('created user_relations table.');
  } catch(err) {
    console.log(err);
  }
  connection.end();
};

main();