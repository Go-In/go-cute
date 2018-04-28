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
  const targets = [
    '4636716008',
    '4637027618',
    '4636727204',
    '4636949254',
    '4636773691',
    '4636929947',
    '4637960766',
    '4636727323',
    '4636901761',
    '4636911622',
    '4636817438',
    '4637003212',
    '4636884027',
    '4636818387',
    '4636856314',
    '4636805439',
    '4636779495',
    '4637883190',
    '4636714065',
    '4636729266',
    '4636793604',
    '4636917839',
    '4636948310',
    '4636878303',
    '4636895671',
    '5510050298',
    '3040495379',
    '1413656901',
    '3628099245',
    '193904360',
    '183683575',
    '32491004',
    '1258755888',
    '3229691469',
    '342005484',
    '578578647',
    '1180519026',
    '4965671393',
    '14531662',
    '365940386',
    '29720794',
    '207448830',
    '2243447781',
    '420023789',
    '45967409',
    '1195098698',
    '201883385',
    '1519917150',
    '648669145'
  ];
  const sw_target  = ['4965671393',
  '14531662',
  '365940386',
  '29720794',
  '207448830',
  '2243447781',
  '420023789',
  '45967409',
  '1195098698',
  '201883385',
  '1519917150',
  '648669145']
  console.log("Hello");
  for (i in targets) {
    console.log(sw_target[i])
    console.log([i])
    const data = await getPost(Number(sw_target[i]), 'x', 'y', headers);
    await insertPostFromUserID(data);
    // console.log(data)
    console.log("================================================================================");
  }
  
  // const data = await getLikes('Bh_I3wAl1x2', 'x', 'x', headers);
  // const data = await getComments('BhrSMvcFkic', 'ownerID', headers);
  // const data = await getComments('BhrSMvcFkic', 'x', headers);
  console.log('================================================================================');
  // unixx = moment("4-1-2018","MM-DD-YYYY").format('X');
  unixx = moment.unix(1522515600)
  console.log(unixx);
  // const shortcodePack = await getShortCode();
  

  // console.log(shortcode[0])
  
  // for (i in shortcodePack[0]) {
  //   const shortcode = shortcodePack[0][i].shortcode;
  //   const ownerID = shortcodePack[0][i].user_id;
  //   console.log(shortcode)
  //   const data = await getLikes(shortcode, 'x', ownerID, headers);
  //   console.log(data)
  //   // await insertLikesFromPost(data);
  //   console.log("================================================================================")
  // }
  
  
  // console.log(data.length);
  // ================================================================================
  // To database
  // console.log("1");
  // const test1 = [ ['Yassssss! So happy! Time to say Bye to Switzerland and say hello to Bangkok🇨🇭♥️ #happytrip','I miss this color!  นาววว 🏝','3', '1', '2', 3, '4'],['4','5','6','7','8',9,'10'] ];
  
  // await insertCommentFromShortCode(data);
  // await insertLikesFromPost(data)
}


main();

 