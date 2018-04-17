const mysql = require('mysql2/promise');
const getConnection = require('../connection');

const main = async () => {
  const connection = await getConnection();

  try {
    await connection.execute('DROP TABLE users');
    await connection.execute('DROP TABLE user_relations');
    await connection.execute('DROP TABLE likes');
    console.log('drop table.');
  } catch(err) {
    console.log(err);
  }
  connection.end();
};

main();