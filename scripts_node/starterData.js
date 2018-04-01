const getUserInstagramData = require('./getUserInstagramData');
const getFollowerInstagramRelation = require('./getFollowerInstagramData');
const { insertUser } = require('./user');
const { insertUserRelations } = require('./userRelation');
require('dotenv').config();
const headers = {
  'cookie': process.env.cookie,
}
const userStarter = {
  username: process.env.username,
  id: process.env.userId
};
console.log(`Creating starter data with username "${userStarter.username}"...`);

const main = async () => {
  const user = await getUserInstagramData(userStarter.username);
  await insertUser(user);
  const followerData = await getFollowerInstagramRelation(userStarter.id, headers)
  await insertUserRelations(followerData);
}
main();
 
