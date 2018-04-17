require('isomorphic-fetch');

const query_hash = '1cb6ec562846122743b61e492c85999f';
const getUrl = postShortCode => `https://www.instagram.com/graphql/query/?query_hash=${query_hash}&variables={"shortcode":"${postShortCode}","first": 1000}`

module.exports = async (postShortCode, postId, ownerId, headers) => {
  try {
    const res = await fetch(getUrl(postShortCode), { 
      headers
    });
    const resJSON = await res.json();
    const edges = resJSON.data.shortcode_media.edge_liked_by.edges;
    /* Pattern
      "id": "",
      "username": "",
      "full_name": "",
      "profile_pic_url": "",
      "is_verified": ,
      "followed_by_viewer": ,
      "requested_by_viewer": 
    */
    return edges.map(e => (
        [
          postId,
          ownerId,
          e.node.id,
        ]
      ));
  } catch (err) {
    console.warn(err);
  }
}
