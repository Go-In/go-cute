require('isomorphic-fetch');
const mysql = require('mysql2');
const getConnection = require('./connection');

const getPath = (user) => 'https://www.instagram.com/' + user + '/?__a=1';

// console.log('connected.')

const getUserData = async (userName, headers) => {
  try {
    const res = await fetch(getPath(userName), {
      headers,
    });
    const user = await res.json();
    // console.log('username: ' + user.graphql.user.username);
    // console.log('id: ' + user.graphql.user.id);
    const payload = {
      user_id: user.graphql.user.id,
      full_name: user.graphql.user.username,
      username: user.graphql.user.full_name,
      biography: user.graphql.user.biography,
      edge_followed_by: user.graphql.user.edge_followed_by.count,
      edge_follow: user.graphql.user.edge_follow.count,
      is_private: user.graphql.user.is_private,
      profile_pic_url: user.graphql.user.profile_pic_url,
      media_count: user.graphql.user.edge_owner_to_timeline_media.count,
    }
    await saveUserData(payload);

  } catch (err) {
    console.log(err)
    throw err;
  }
}

const saveUserData = async (userData) => {
  const connection = await getConnection();

  try {
    await connection.query('INSERT INTO users SET ?', userData);
    console.log('user data saved.');
    await connection.end();
  } catch (err) {
    console.log(err)
    throw err;
  }
}

module.exports = getUserData;
