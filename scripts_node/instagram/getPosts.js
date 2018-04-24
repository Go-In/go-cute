const _ = require('lodash');
require('isomorphic-fetch');


const query_hash = '42323d64886122307be10013ad2dcc44';
const max = 50;
// const getUrl = (postShortCode, end_cursor = '') => `https://www.instagram.com/graphql/query/?query_hash=${query_hash}&variables=%7B"id"%3A"${postShortCode}"%2C"first"%3A${max}%2C"after"%3A"${end_cursor}"%7D`;
const getUrl = (user_id, end_cursor = '') => `https://www.instagram.com/graphql/query/?query_hash=${query_hash}&variables={"id":"${user_id}","first": ${max},"after":"${end_cursor}"}`;
module.exports = async (user_id, postId, ownerId, headers) => {
  try {
    let next = true;
    let end_cursor = "";
    let edges = [];
    let c = 1; 
    let i = 0;
    let stopu = true;
    const MAX = 1;
    while (stopu) {
      const res = await fetch(getUrl(user_id, end_cursor), { 
        headers
      });
      const resJSON = await res.json();
      // console.log("1");
    //   console.log(`https://www.instagram.com/graphql/query/?query_hash=${query_hash}&variables=%7B"id"%3A"${postShortCode}"%2C"first"%3A${max}%2C"after"%3A"${end_cursor}"%7D`);
      const edge_owner = resJSON.data.user.edge_owner_to_timeline_media;
      next = edge_owner.page_info.has_next_page;
      end_cursor = edge_owner.page_info.end_cursor;
      edges = _.concat(edges, edge_owner.edges);
      i++;
      console.log(edges.length)
      if(i > MAX) {
          stopu = false;
      }
      
    //   for(i in edges) {
    //       console.log("==================================")
    //       console.log(i)
    //       console.log("===================================")
    //   }
      
    }
    
    return edges.map(e => (
        [
          user_id,  //ownerID
          e.node.id,
          e.node.__typename,
          ((e.node.edge_media_to_caption.edges).length === 1) ? e.node.edge_media_to_caption.edges[0].node.text:'', //Caption
          e.node.display_url, //Pictures Url
          e.node.edge_media_to_comment.count,
          e.node.shortcode,
        //   e.node.edge_media_to_comment.count,
        ]
      ));
  } catch (err) {
    console.warn(err);
  }
}
