const getUserInstagramData = require('../instagram/getUserInstagramData');
const getUsernameFromUserID = require('../instagram/getUsernameFromUserID');
const {
  findUserNotSearch,
  updateUserById,
} = require('../user');
const getConnection = require('../connection');

require('dotenv').config();
const CronJob = require('cron').CronJob;

const headers = {
  'cookie': process.env.cookie,
}

const main = async () => {
  console.log('get user starting...')
  const connection = await getConnection();
  const user = await findUserNotSearch(connection);
  if (user) {
    const username = await getUsernameFromUserID(user.user_id, headers)
    const igData = await getUserInstagramData(username, headers);
    await updateUserById(igData, connection);
    await connection.end();
  }
}

const getUser = new CronJob({
  cronTime: '*/3 * * * * *',
  onTick: () => {
    main();
  },
  start: true,
});

getUser.start();
