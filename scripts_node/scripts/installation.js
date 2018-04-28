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

  const createLikeTableSql = `CREATE TABLE likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id VARCHAR(255),
    owner_id VARCHAR(255),
    user_id VARCHAR(255)
  )`;

  try {
    await connection.execute(createLikeTableSql)
    console.log('create likes table');
  } catch (err) {
    console.log(err);
  }

  const createPostTableSql = `CREATE TABLE post (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255),
    post_id VARCHAR(255),
    type_name VARCHAR(255),
    caption VARCHAR(10000),
    display_url VARCHAR(255),
    comment_count INT,
    like_count INT,
    shortcode VARCHAR(255),
    timestamp VARCHAR(255),
    total_post INT
    )`;

  const convertPostTable = 'ALTER TABLE post CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin';
  try {
    await connection.execute(createPostTableSql);
    await connection.execute(convertPostTable);
    console.log('created post table.');
  } catch(err) {
    console.log(err);
  }

  const createCommentTableSql = `CREATE TABLE comment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    short_code VARCHAR(255),
    user_id VARCHAR(255),
    comment_id VARCHAR(255),
    commentator_id VARCHAR(255),
    comment VARCHAR(10000),
    timestamp VARCHAR(255)
  )`;

  const convertCommentTable = 'ALTER TABLE comment CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin';
  try {
    await connection.execute(createCommentTableSql);
    await connection.execute(convertCommentTable);
    console.log('created comment table.');
  } catch(err) {
    console.log(err);
  }
  // connection.end();

  const createLikecountTable = `CREATE TABLE likecount (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255),
    total_like INT,
    collected_like INT
  )`;

  // const convertCommentTable = 'ALTER TABLE comment CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin';
  try {
    await connection.execute(createLikecountTable);
    // await connection.execute(convertCommentTable);
    console.log('created likecount table.');
  } catch(err) {
    console.log(err);
  }
  connection.end();
};

main();