const _ = require('lodash');
const getUserInstagramData = require('./getUserInstagramData');
const getFollowerInstagramRelation = require('./getFollowerInstagramData');
const getAllFollowerInstagramRelation = require('./getAllFollowerInstagramData');
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
  _.times(10000, (index) => {
    setTimeout(async () => {
      const user_id = await findUserNotFetchToFetch();
      console.log(user_id);
      await getAllFollowerInstagramRelation(user_id, headers);
    }, 10000 * (index+1));
  })
}

main();

 