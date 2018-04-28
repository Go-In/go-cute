const _ = require('lodash');
const getLikes = require('./instagram/getLikes.js');
const getComments = require('./instagram/getComments')
const getPost = require('./instagram/getPosts')
const { insertLikesFromPost } = require('./model/like');
const { insertLikesCount } = require('./model/like');
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
  
  // unixx = moment("4-1-2018","MM-DD-YYYY").format('X');
  // unixx = moment.unix(1522515600)
  // console.log(unixx);
  for (i in targets) {
    const user_id = targets[i];
    // console.log(user_id)
    const shortcodePack = await getShortCode(Number(user_id));
    var sum=0;
    var real_data_sum=0;
    for (i in shortcodePack) {
      const shortcode = shortcodePack[i].shortcode;
      const ownerID = shortcodePack[i].user_id;
      sum += shortcodePack[i].like_count;
      // console.log(shortcode)
      console.log(shortcode);
      const data = await getLikes(shortcode, 'x', ownerID, headers);
      // console.log(sum)
      // await insertLikesFromPost(data);
      // console.log('data = ',data.length);
      real_data_sum += data;
      console.log('*******');
    }
    console.log(user_id, "sum like =",sum);
    await insertLikesCount([[user_id, sum, real_data_sum]])
    console.log("Total - Real of like =", sum-real_data_sum);
    console.log("================================================================================")
  }
  
  // console.log(data.length);
  // ================================================================================
  // To database
  // console.log("1");
  // const test1 = [ ['Yassssss! So happy! Time to say Bye to Switzerland and say hello to Bangkok🇨🇭♥️ #happytrip','I miss this color!  นาววว 🏝','3', '1', '2', 3, '4'],['4','5','6','7','8',9,'10'] ];
  
  // await insertCommentFromShortCode(data);
  // await insertLikesFromPost(data)
}


main();

 