const readline = require('readline');
const getUser = require('../instagram/getUserInstagramData');
const { insertUser } = require('../model/user');
require('dotenv').config();

const headers = {
  'cookie': process.env.cookie,
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('username: ', async (username) => {
  // TODO: Log the answer in a database
  const user = await getUser(username, headers);
  await insertUser(user);
  rl.close();
});
