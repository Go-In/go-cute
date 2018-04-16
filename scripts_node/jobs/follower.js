const _ = require('lodash');
const moment = require('moment');
const getUserInstagramData = require('./getUserInstagramData');
const getFollowerInstagramRelation = require('./getFollowerInstagramData');
const getAllFollowerInstagramRelation = require('./getAllFollowerInstagramData');
const {
  findUserNotSearch,
  updateUserById,
  getUserById,
  insertUser,
  getUserByUserName,
  findUserNotFetchToFetch
} = require('./user');
const { getUserRelationById } = require('./userRelation')
require('dotenv').config();
const CronJob = require('cron').CronJob;

const headers = {
  'cookie': process.env.cookie,
}

const main = async () => {
  console.log('get follower starting...')
  const user = await findUserNotFetchToFetch();
  const igData = await getUserInstagramData(user.username, headers);
  await updateUserById(igData);
  if (!igData.is_private) {
    await getAllFollowerInstagramRelation(user.user_id, headers);
  }
  else {
    console.log(`${igData.username} is private.`);
  }
}

const nowSecond = parseInt(moment().format('ss'));

const getFollower = new CronJob({
  cronTime: `${nowSecond} */1 * * * *`,
  onTick: () => {
    main();
  },
  start: true,
});

getFollower.start();
