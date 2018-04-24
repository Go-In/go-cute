const _ = require('lodash');
const getLikes = require('./instagram/getLikes.js');
const getComments = require('./instagram/getComments')
const getPost = require('./instagram/getPosts')
const { insertLikesFromPost } = require('./model/like');
const { insertPostFromPost } = require('./model/post');
require('dotenv').config();

const headers = {
  'cookie': process.env.cookie
}


const main = async () => {
  console.log("Hello");
  // const data = await getLikes('BdXhLmklEpKdaEmoP-dhvugvxeCjgf-gnYRA6U0', 'x', 'x', headers);
  // const data = await getComments('BhrSMvcFkic', 'x', 'y', headers);
  const data = await getPost('2301760', 'x', 'y', headers);
  console.log(data)
  // console.log(data2[0]);
  
  
  // ================================================================================
  // To database
  // console.log("1");
  const test1 = [ ['Yassssss! So happy! Time to say Bye to Switzerland and say hello to Bangkok🇨🇭♥️ #happytrip','I miss this color!  นาววว 🏝','3', '1', '2', 3, '4'],['4','5','6','7','8',9,'10'] ];
  
  await insertPostFromPost(data);
  // console.log("2");
  
}


main();

 