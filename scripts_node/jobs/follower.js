const _ = require('lodash');
const moment = require('moment');
const getUserInstagramData = require('../instagram/getUserInstagramData');
const getFollowerInstagramRelation = require('../instagram/getFollowerInstagramData');
const getAllFollowerInstagramRelation = require('../instagram/getAllFollowerInstagramData');
const getConnection = require('../connection');
const {
  findUserNotSearch,
  updateUserById,
  getUserById,
  insertUser,
  getUserByUserName,
  findUserNotFetchToFetch
} = require('../model/user');
const { getUserRelationById } = require('../model/userRelation')
require('dotenv').config();
const CronJob = require('cron').CronJob;

const headers = {
  'cookie': process.env.cookie,
}

const main = async () => {
  console.log('get follower starting...')
  const connection = await getConnection();
  const user = await findUserNotFetchToFetch(connection);
  const igData = await getUserInstagramData(user.username, headers);
  if (igData) {
    await updateUserById(igData, connection);
    if (!igData.is_private) {
      await getAllFollowerInstagramRelation(user.user_id, headers, connection);
    }
    else {
      await connection.end();
      console.log(`${igData.username} is private.`);
    }
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
