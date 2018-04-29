const delay = require('delay');
const mysql = require('mysql2/promise');
require('isomorphic-fetch');
require('dotenv').config();

const getConnection = require('../connection');

const headers = {
  'cookie': process.env.cookie,
}

const query_hash = '1cb6ec562846122743b61e492c85999f';
const max = 50;
const getUrl = (postShortCode, end_cursor = '') => `https://www.instagram.com/graphql/query/?query_hash=${query_hash}&variables={"shortcode":"${postShortCode}","first": ${max},"after":"${end_cursor}"}`;

async function getPostIdByUserId(userId) {
  const connection = await getConnection();
  try {
    const query = await connection.query(`select shortcode from post where user_id=${userId} and timestamp > 1522515600;`);
    return query[0].map(r => r.shortcode);
  } catch(err) {
    throw err;
  }
  connection.end();  
}

async function getDataAndSave(postShortCode, user_id) {
  try {
    let next = true;
    let r = 1;
    let end_cursor;
    while (next) {
      console.log('fetch', postShortCode)
      const res = await fetch(getUrl(postShortCode, end_cursor), { 
        headers
      });
      const json = await res.json();
      if (json.status === 'fail') {
        console.log('request fail')
        await delay(600000);
      } else {
        const edge_liked_by = resJSON.data.shortcode_media.edge_liked_by;
        next = edge_liked_by.page_info.has_next_page;
        end_cursor = edge_liked_by.page_info.end_cursor;
        const payload = edge_liked_by.edges.map(e => (
          [
            e.node.id , // liked_by
            user_id, // liked
            postShortCode, // post_shortcode
          ]
        ));
        const connection = await getConnection();
        await connection.query('INSERT INTO likes (liked_by, liked, post_shortcode) VALUES ?', [payload]);
        await connection.end();
        console.log('round=', r++);
        console.log(end_cursor);   
      }
    }
  } catch (err) {
    console.warn(err);
  }
}

async function main() {
  const user_id = process.argv.slice(2)[0];
  const list = await getPostIdByUserId(user_id);
  for (let i=0; i<list.length; i++) {
    await getDataAndSave(list[i], user_id);
    console.log('finish ', list[i]);
  }
  console.log('finish ', user_id);
}

main();
