const getUserInstagramData = require('../instagram/getUserInstagramData');
const getUsernameFromUserID = require('../instagram/getUsernameFromUserID');
const {
  findUserNotSearch,
  updateUserById,
  findUserNotFetchToFetch,
} = require('../model/user');
const getConnection = require('../connection');
const delay = require('delay');

require('dotenv').config();
const CronJob = require('cron').CronJob;

const headers = {
  'cookie': process.env.cookie,
}

const main = async () => {
  console.log('get user starting...')
  const stop = false;
  let user = undefined;
  let connection;
  let count = 0;
  while(!stop) {
    if (!user) {
      connection = await getConnection();
      user = await findUserNotFetchToFetch(connection);
    }
    if(!user) {
      break;
    }
    console.log(count);
    console.log('user id: ', user.user_id);
    const username = await getUsernameFromUserID(user.user_id, headers)
    console.log('username: ', username);
    if(username) {
      const igData = await getUserInstagramData(username, headers);
      if (igData) {
        await updateUserById(igData, connection);
        user = undefined;
        await connection.end();
        count++;
      } else {
        await connection.end();
        await delay(600000);
        connection = await getConnection();
      }
    } else {
      await connection.end();
      await delay(600000);
      connection = await getConnection();
    }
  }
}

main();