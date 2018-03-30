const getUserInstagramData = require('./getUserInstagramData');
const getFollowerInstagramRelation = require('./getFollowerInstagramData');
const { insertUser } = require('./user');
const { insertUserRelations } = require('./userRelation');

const headers = {
  'cookie': '',
}
const userStarter = {
  username: '',
  id: ''
};
console.log(`Creating starter data with username "${userStarter.username}"...`);

const main = async () => {
  const user = await getUserInstagramData(userStarter.username);
  await insertUser(user);
  const followerData = await getFollowerInstagramRelation(userStarter.id, headers)
  await insertUserRelations(followerData);
}
main();
 