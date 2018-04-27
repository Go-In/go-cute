const mysql = require('mysql2/promise');
const getConnection = require('../connection');

const main = async () => {
  const tableLike = 'users';
  const tableName = 'user_from_follow';
  const uniqFields = 'user_id'; // column1,column2,...
  const tableInsert = 'bnk_relations';

  console.log(`Uniqe Table ${tableInsert} by ${uniqFields}.`);
  const connection = await getConnection();

  await connection.execute(`CREATE TABLE ${tableName} LIKE ${tableLike};`);
  console.log(`create table ${tableName}.`);
  await connection.execute(`ALTER TABLE ${tableName} ADD UNIQUE(${uniqFields});`);
  console.log('Inserting...');
  await connection.execute(`INSERT IGNORE INTO ${tableName} (user_id) SELECT user_id FROM ${tableInsert};`);
  await connection.end();
  console.log('Completed.')
}

main();

 