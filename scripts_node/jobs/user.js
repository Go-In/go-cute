const getUserInstagramData = require('../getUserInstagramData');
const {
  findUserNotSearch,
  updateUserById,
} = require('../user');
require('dotenv').config();
const CronJob = require('cron').CronJob;

const headers = {
  'cookie': process.env.cookie,
}

const main = async () => {
  console.log('get user starting...')
  const user = await findUserNotSearch();
  if(user.username) {
    const igData = await getUserInstagramData(user.username, headers);
    await updateUserById(igData);
  }
}

const getUser = new CronJob({
  cronTime: '*/2 * * * * *',
  onTick: () => {
    main();
  },
  start: true,
});

getUser.start();