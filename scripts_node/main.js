const _ = require('lodash');
const getLikes = require('./instagram/getLikes.js');
const getComments = require('./instagram/getComments')
const getPost = require('./instagram/getPosts')
const { insertLikesFromPost } = require('./model/like');
const { insertPostFromUserID } = require('./model/post');
const { getShortCode } = require('./model/post');
const { insertCommentFromShortCode } = require('./model/comment');
require('dotenv').config();

var moment = require('moment');

const headers = {
  'cookie': process.env.cookie
}


const main = async () => {
  console.log("Hello");
  // const data = await getLikes('Bh_I3wAl1x2', 'x', 'x', headers);
  // const data = await getComments('BhrSMvcFkic', 'ownerID', headers);
  // const data = await getPost('1180519026', 'x', 'y', headers);
  // const data = await getComments('BhrSMvcFkic', 'x', headers);
  console.log('================================================================================');
  // unixx = moment("4-1-2018","MM-DD-YYYY").format('X');
  // unixx = moment.unix(1524633659)
  // console.log(unixx);
  const shortcodePack = await getShortCode();

  // console.log(shortcode[0])
  for (i in shortcodePack[0]) {
    const shortcode = shortcodePack[0][i].shortcode;
    const ownerID = shortcodePack[0][i].user_id;
    console.log(shortcode)
    const data = await getLikes(shortcode, 'x', ownerID, headers);
    console.log(data)
    await insertLikesFromPost(data);
    console.log("================================================================================")
  }
  // console.log(data.length);
  // ================================================================================
  // To database
  // console.log("1");
  // const test1 = [ ['Yassssss! So happy! Time to say Bye to Switzerland and say hello to Bangkok🇨🇭♥️ #happytrip','I miss this color!  นาววว 🏝','3', '1', '2', 3, '4'],['4','5','6','7','8',9,'10'] ];
  
  // await insertPostFromUserID(data);
  // await insertCommentFromShortCode(data);
  // await insertLikesFromPost(data)
}


main();

 