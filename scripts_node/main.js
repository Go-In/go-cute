const getUserInstagramData = require('./getUserInstagramData');
const getFollowerInstagramRelation = require('./getFollowerInstagramData');
const { getUserById } = require('./user');

const headers = {
  'cookie': '',
}
let userCount = 1;
let userFollowerCount = 1;

const main = async () => {
  const user = await getUserById(1);
  console.log(user)
}

main();

 
// getUserInstagramData('kmcl__');

// getFollowerInstagramRelation('494199025', headers)