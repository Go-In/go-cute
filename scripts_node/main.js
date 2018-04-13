const _ = require('lodash');
const getUserInstagramData = require('./getUserInstagramData');
const getFollowerInstagramRelation = require('./getFollowerInstagramData');
const { getUserById, insertUser, getUserByUserName, findUserNotFetchToFetch } = require('./user');
const { getUserRelationById } = require('./userRelation')
require('dotenv').config();

const headers = {
  'cookie': process.env.cookie,
}
let userCount1 = 1;
let userCount2 = 2;
let userCount3 = 3;
let userFollowerCount = 1;

const main = async () => {
  // const res = await checkUserExited('30305044');
  const res = await findUserNotFetchToFetch();
  console.log(res);
  // _.times(99999, (index) => {
  //   setTimeout(() => {
  //     const start = 0;
  //     const round = (index * 1) % 275;
  //     console.log(`count: ${index+1}, round: ${round}`)
  //     let userCount1 = start + 1 + round;
  //     worker(userCount1);
  //   }, 1000 * (index+1));
  // })
}

const worker = async (id) => {
  const userRelation = await getUserRelationById(id);
  if (userRelation) {
    const userName1 = await userRelation.followed;
    const checkUser = await getUserByUserName(userName1);
    if (!checkUser) {
      const user1 = await getUserInstagramData(userName1);
      await insertUser(user1);
    }
  }
}

main();

 
// getUserInstagramData('kmcl__');

// getFollowerInstagramRelation('494199025', headers)