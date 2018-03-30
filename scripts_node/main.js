const _ = require('lodash');
const getUserInstagramData = require('./getUserInstagramData');
const getFollowerInstagramRelation = require('./getFollowerInstagramData');
const { getUserById, insertUser } = require('./user');
const { getUserRelationById } = require('./userRelation')

const headers = {
  'cookie': '',
}
let userCount1 = 1;
let userCount2 = 2;
let userCount3 = 3;
let userFollowerCount = 1;

const main = async () => {
  _.times(69, (index) => {
    setTimeout(() => {
      console.log(`count: ${index+1}`)
      const start = 183;
      let userCount1 = start + 0 + (index * 4);
      let userCount2 = start + 1 + (index * 4);
      let userCount3 = start + 2 + (index * 4);
      let userCount4 = start + 3 + (index * 4);
      worker(userCount1);
      worker(userCount2);
      worker(userCount3);
      worker(userCount4);
    }, 8000 * (index+1));
  })
}

const worker = async (id) => {
  const userRelation = await getUserRelationById(id);
  if (userRelation) {
    const userName1 = await userRelation.followed;
    const user1 = await getUserInstagramData(userName1);
    await insertUser(user1);
  }
}

main();

 
// getUserInstagramData('kmcl__');

// getFollowerInstagramRelation('494199025', headers)