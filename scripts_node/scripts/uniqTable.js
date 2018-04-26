const mysql = require('mysql2/promise');
const getConnection = require('../connection');

// node scripts/uniqTable.js bnk_relations user_id,followed_id
const main = async () => {
  const tableName = process.argv[2];
  const fields = process.argv[3];

  console.log(`Uniqe Table ${tableName} by ${fields}.`);
  const uniqTable = `${tableName}_uniq`;
  const connection = await getConnection();

  await connection.execute(`CREATE TABLE ${uniqTable} LIKE ${tableName};`);
  console.log(`create table ${uniqTable}.`);
  await connection.execute(`ALTER TABLE ${uniqTable} ADD UNIQUE(${fields});`);
  console.log('Inserting...');
  await connection.execute(`INSERT IGNORE INTO ${uniqTable} SELECT * FROM ${tableName};`);
  await connection.end();
  console.log('Completed.')
}

main();

 