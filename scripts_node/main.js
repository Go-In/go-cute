const _ = require('lodash');
const getPostIdByUserId = require('./model/comment');
const fetchComment = require('./instagram/getComments');

require('dotenv').config();

const headers = {
  'cookie': process.env.cookie,
}

const main = async () => {
  const comments = await fetchComment('Bh_I3wAl1x2', headers);
  console.log(comments);
}

main();

 