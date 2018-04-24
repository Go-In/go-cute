const delay = require('delay');
require('isomorphic-fetch');
require('dotenv').config();
const headers = {
  'cookie': process.env.cookie,
}

const max = 50;
const query_hash = '58712303d941c6855d4e888c5f0cd22f';
const getPath = (userId, token = '') => `https://www.instagram.com/graphql/query/?query_hash=${query_hash}&variables={"id":"${userId}","first":${max},"after":"${token}"}`;

const main = async () => {
  const user_id = '4636716008';
  let canNext = true;
  let cursor = '';
  let r = 1;
  // while(canNext) {
    const url = getPath(user_id, cursor);
    console.log('fetch')
    const res = await fetch(url, { headers });
    const json = await res.json();
    if (json.status === 'fail') {
      console.log('request fail')
      await delay(600000);
    } else {
      canNext = json.data.user.edge_follow.page_info.has_next_page
      cursor = json.data.user.edge_follow.page_info.end_cursor;
      console.log('cursor= ', cursor);
      console.log('round= ', r++);
    }
    const edges = json.data.user.edge_follow_info.edges;
    console.log(edges);
  // }
}

main();