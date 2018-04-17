const _ = require('lodash');
const getUserInstagramData = require('./getUserInstagramData');
const getFollowerInstagramRelation = require('./getFollowerInstagramData');
const getAllFollowerInstagramRelation = require('./getAllFollowerInstagramData');
const { updateUserById, getUserById, insertUser, getUserByUserName, findUserNotFetchToFetch } = require('./user');
const { getUserRelationById } = require('./userRelation')
const getUsernameFromUserID = require('./getUsernameFromUserID');
const getLikes = require('./instagram/getLikes.js');
const { insertLikesFromPost } = require('./model/like');
require('dotenv').config();

const headers = {
  'cookie': process.env.cookie,
}

const main = async () => {
  const data = await getLikes('BhoRH-DHsbWfq48d0H7OawZewISJ1s7h9ci_Xg0', 'x', 'x', headers);
  console.log(data.length);
  // insertLikesFromPost(data);

  // console.log('starting...')
  // _.times(20000, (index) => {
  //   setTimeout(async () => {
  //     const user = await findUserNotFetchToFetch();
  //     const igData = await getUserInstagramData(user.username, headers);
  //     await updateUserById(igData);
  //     if (!igData.is_private) {
  //       await getAllFollowerInstagramRelation(user.user_id, headers);
  //     }
  //     else {
  //       console.log(`${igData.username} is private.`);
  //     }
  //   }, 60000 * (index));
  // })
}

main();

 