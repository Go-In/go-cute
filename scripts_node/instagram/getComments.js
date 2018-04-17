const _ = require('lodash');
require('isomorphic-fetch');


const query_hash = '33ba35852cb50da46f5b5e889df7d159';
const max = 10;
const getUrl = (postShortCode, end_cursor = '') => `https://www.instagram.com/graphql/query/?query_hash=${query_hash}&variables={"shortcode":"${postShortCode}","first": ${max},"after":"${end_cursor}"}`;

module.exports = async (postShortCode, postId, ownerId, headers) => {
  try {
    let next = true;
    let end_cursor = undefined;
    let edges = [];
    let c = 1; 
    while (next) {
      const res = await fetch(getUrl(postShortCode, end_cursor), { 
        headers
      });
      const resJSON = await res.json();
      const edge_media_to_comment = resJSON.data.shortcode_media.edge_media_to_comment;
      next = edge_media_to_comment.page_info.has_next_page;
      end_cursor = edge_media_to_comment.page_info.end_cursor;
      edges = _.concat(edges, edge_media_to_comment.edges);
    }

    return edges.map(e => (
        [
          e.node.id ,
          e.node.owner.id ,
          e.node.text,
        ]
      ));
  } catch (err) {
    console.warn(err);
  }
}
