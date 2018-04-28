require('isomorphic-fetch');
const mysql = require('mysql2/promise');

const getPath = (user) => 'https://www.instagram.com/' + user + '/';

// console.log('connected.')

// const getUserData = async (userName, headers) => {
//   try {
//     const res = await fetch(getPath(userName), {
//       headers,
//     });
//     const user = await res.json();
//     // console.log('username: ' + user.graphql.user.username);
//     // console.log('id: ' + user.graphql.user.id);
//     const payload = {
//       user_id: user.graphql.user.id,
//       full_name: user.graphql.user.full_name,
//       username: user.graphql.user.username,
//       biography: user.graphql.user.biography,
//       edge_followed_by: user.graphql.user.edge_followed_by.count,
//       edge_follow: user.graphql.user.edge_follow.count,
//       is_private: user.graphql.user.is_private,
//       profile_pic_url: user.graphql.user.profile_pic_url,
//       media_count: user.graphql.user.edge_owner_to_timeline_media.count,
//     }
//     return payload;

//   } catch (err) {
//     console.log(err)
//     throw err;
//   }
// }

const getUserData = async (userName, headers) => {
  try {
    const res = await fetch(getPath(userName), {
      headers,
    });
    const text = await res.text();
    const userDataText = (text.split("window._sharedData = ")[1] || "").split(";</script>")[0];
    if(userDataText === '') {
      return undefined;
    }
    const userData = JSON.parse(userDataText);
    const user = (((userData.entry_data || {}).ProfilePage[0] || {}).graphql || {}).user;
    // console.log('username: ' + .user.username);
    // console.log('id: ' + .user.id);
    const payload = {
      user_id: user.id,
      full_name: user.full_name,
      username: user.username,
      biography: user.biography,
      edge_followed_by: user.edge_followed_by.count,
      edge_follow: user.edge_follow.count,
      is_private: user.is_private,
      profile_pic_url: user.profile_pic_url,
      media_count: user.edge_owner_to_timeline_media.count,
    }
    return payload;

  } catch (err) {
    console.log(err)
    throw err;
  }
}

module.exports = getUserData;
