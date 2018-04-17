const _ = require('lodash');
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
}

main();

 