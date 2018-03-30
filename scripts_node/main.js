const getUserData = require('./getUserData');
const getFollowerRelation = require('./getFollowerData');

const headers = {
  'cookie': '',
}
 
// getUserData('tadamints');

getFollowerRelation('494199025', headers)