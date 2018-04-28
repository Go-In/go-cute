require('isomorphic-fetch');

const query_hash = 'bfe6fc64e0775b47b311fc0398df88a9'
const getUrl = userId => `https://www.instagram.com/graphql/query/?query_hash=${query_hash}&variables={"user_id":"${userId}","include_chaining":false,"include_reel":true,"include_suggested_users":false,"include_logged_out_extras":false}`

module.exports = async (userId, headers) => {
  try {
    const res = await fetch(getUrl(userId), { 
      headers
    });
    const resJSON = await res.json();
    if (resJSON.status !== 'fail') {
      const reel = resJSON.data.user.reel;
      // can get 2 way
      return (reel.user.username || reel.owner.username);
    } else {
      return undefined;
    }
  } catch (err) {
    console.warn(err);
  }
}
