const mysql = require('mysql2');
const getConnection = require('../connection');

const main = async () => {
  const connection = await getConnection();
  
  const createBnkRelationTableSql = `CREATE TABLE bnk_relations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255),
    followed_id VARCHAR(255)
  )`;

  try {
    await connection.execute()
  } catch (err) {
    console.log(err);
  }
  
  connection.end();
}

main();