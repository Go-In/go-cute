require('isomorphic-fetch');

const query_hash = '1cb6ec562846122743b61e492c85999f';
const getUrl = postId => `https://www.instagram.com/graphql/query/?query_hash=${query_hash}
&variables={
  "shortcode":"${postId}",
  "first": 1000,
}`

module.exports = async (userId, headers) => {
  try {
    const res = await fetch(getUrl(userId), { 
      headers
    });
    const resJSON = await res.json();
    const reel = resJSON.data.user.reel;
    // can get 2 way
    return (reel.user.username || reel.owner.username);
  } catch (err) {
    console.warn(err);
  }
}
