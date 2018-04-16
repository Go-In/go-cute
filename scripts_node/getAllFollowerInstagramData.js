require('isomorphic-fetch');
const mysql = require('mysql2');
const getConnection = require('./connection');

const max = 1000;
const query_hash = '37479f2b8209594dde7facb0d904896a';
const { insertUserRelations } = require('./userRelation');
const { insertUserFromFollower, checkUserExited } = require('./user');
// const token = 'AQBJFvVF3UY_lLuWfgFptSfY49vYKSylmkMH_bFhDBxNAeAN-dPyQ_Ehd-NT3X1YK4N63pXdzoU2kuuHiEveGITclElRCYUf89XOD96vhHesdQ';

const getPath = (userId, query_hash, token = '') => `https://www.instagram.com/graphql/query/?query_hash=${query_hash}&variables={"id":"${userId}","first":${max},"after":"${token}"}`

const getFollowerRelation = async (userId, headers) => {
  let next = true;
  let token = undefined;
  let count = 0;
  while(next) {
    const data = await getUsers(userId, headers, query_hash, token);
    next = data.page_info.has_next_page;
    token = data.page_info.end_cursor;
    if (data.relations.length > 0) {
      await insertUserRelations(data.relations);
    }
    const connection = await getConnection();
    const results = data.users.map(async (user, index) => {
      count += 1;
      const isExited = await checkUserExited(user[0], connection);
      if (!isExited) {
        await insertUserFromFollower([user], connection);
      }
      return count;
    })
    Promise.all(results).then(() => connection.end());
  }
  console.log(count);
  console.log('*********************');
}

const getUsers = async (userId, headers, query_hash, token) => {
  try {
    const res = await fetch(getPath(userId, query_hash, token), {
      headers,
    });
    const user = await res.json();
    const { edges, page_info } = user.data.user.edge_followed_by;
    const relations = edges.map((edge) => {
      const data = [
        userId,
        edge.node.id,
        edge.node.username,
      ]
      return data;
    });
    const users = edges.map((edge) => {
      // const data = {
      //   user_id: edge.node.id,
      //   full_name: edge.node.full_name,
      //   username: edge.node.username,
      //   profile_pic_url: edge.node.profile_pic_url,
      // }
      const data = [
        edge.node.id,
        edge.node.full_name,
        edge.node.username,
        edge.node.profile_pic_url,
      ]
      return data;
    });
    return {
      users,
      relations,
      page_info,
    }
  } catch (err) {
    console.log(err)
    throw err;
  }
}

module.exports = getFollowerRelation;