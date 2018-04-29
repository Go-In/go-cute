const delay = require('delay');
const mysql = require('mysql2/promise');
require('isomorphic-fetch');
require('dotenv').config();

const getConnection = require('../connection');

const headers = {
  'cookie': process.env.cookie,
}

const query_hash = '33ba35852cb50da46f5b5e889df7d159';
const max = 50;
const getUrl = (postShortCode, end_cursor = '') => `https://www.instagram.com/graphql/query/?query_hash=${query_hash}&variables={"shortcode":"${postShortCode}","first": ${max},"after":"${end_cursor}"}`;

async function getPostIdByUserId(userId) {
  const connection = await getConnection();
  try {
    const query = await connection.query(`select shortcode from post where user_id=${userId}`);
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
        const edge_media_to_comment = json.data.shortcode_media.edge_media_to_comment;
        next = edge_media_to_comment.page_info.has_next_page;
        end_cursor = edge_media_to_comment.page_info.end_cursor;
        const payload = edge_media_to_comment.edges.map(e => (
          [
            e.node.id , // comment_id
            e.node.owner.id , // commentor
            e.node.text, // text
            user_id, // commented
            e.node.created_at, // created_at
            postShortCode // post_shortcode
          ]
        ));
        const connection = await getConnection();
        await connection.query('INSERT INTO comment (comment_id, commentor_id, text, commented_id, created_at, post_shortcode) VALUES ?', [payload]);
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
  getDataAndSave('Bh_I3wAl1x2', 'x')
  // const user_id = process.argv.slice(2)[0];
  // const list = await getPostIdByUserId(user_id);
  // console.log(list.length);
}

main();
