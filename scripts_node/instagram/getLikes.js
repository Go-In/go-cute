const _ = require('lodash');
require('isomorphic-fetch');


const query_hash = '1cb6ec562846122743b61e492c85999f';
const max = 50;
const getUrl = (postShortCode, end_cursor = '') => `https://www.instagram.com/graphql/query/?query_hash=${query_hash}&variables={"shortcode":"${postShortCode}","first": ${max},"after":"${end_cursor}"}`;

module.exports = async (postShortCode, postId, ownerId, headers) => {
  try {
    let next = true;
    let end_cursor = undefined;
    let edges = [];
    let c = 1; 
    let i=0;
    while (i<10) {
      const res = await fetch(getUrl(postShortCode, end_cursor), { 
        headers
      });
      const resJSON = await res.json();
      // console.log(resJSON)
      // if( json.status === 'fail') {
      //   console
      // }
      const edge_liked_by = resJSON.data.shortcode_media.edge_liked_by;
      
      next = edge_liked_by.page_info.has_next_page;
      end_cursor = edge_liked_by.page_info.end_cursor;
      edges = _.concat(edges, edge_liked_by.edges);
      i += 1;
      console.log(i);
    }

    return edges.map(e => (
        [
          postShortCode,
          ownerId,
          e.node.id,
        ]
      ));
  } catch (err) {
    console.warn(err);
  }
}
