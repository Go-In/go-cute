const getUserInstagramData = require('../getUserInstagramData');
const {
  findUserNotSearch,
  updateUserById,
} = require('../user');

/* GETTING Username from IG */
const getUsernameFromUserID = require('../getUsernameFromUserID');

require('dotenv').config();
const CronJob = require('cron').CronJob;

const headers = {
  'cookie': process.env.cookie,
}

const main = async () => {
  console.log('get user starting...')
  const user = await findUserNotSearch();
  if (user) {
    
    let username;
    
    if (!user.username) {
      username = await getUsernameFromUserID(user.user_id)
    } else {
      username = username.username
    }

    const igData = await getUserInstagramData(username, headers);
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
