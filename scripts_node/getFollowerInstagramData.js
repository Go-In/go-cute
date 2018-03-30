require('isomorphic-fetch');
const mysql = require('mysql2');
const getConnection = require('./connection');

const max = 1000;

const getPath = (userId) => `https://www.instagram.com/graphql/query/?query_hash=37479f2b8209594dde7facb0d904896a&variables=%7B%22id%22%3A%22${userId}%22%2C%22first%22%3A${max}%7D`

const getFollowerRelation = async (userId, headers) => {
  try {
    const res = await fetch(getPath(userId), {
      headers,
    });
    const user = await res.json();
    const { edges } = user.data.user.edge_followed_by;
    const payload = edges.map((edge) => {
      const data = [
        userId,
        edge.node.id,
      ]
      return data;
    });
    await saveFollowerRelationData(payload);

  } catch (err) {
    console.log(err)
    throw err;
  }
}

const saveFollowerRelationData = async (followerData) => {
  const connection = await getConnection();

  try {
    await connection.query('INSERT INTO user_relations (user_id, followed) VALUES ?', [followerData]);
    console.log('follower data saved.');
    await connection.end();
  } catch (err) {
    console.log(err)
    throw err;
  }
}

module.exports = getFollowerRelation;