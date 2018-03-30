const getUserInstagramData = require('./getUserInstagramData');
const getFollowerInstagramRelation = require('./getFollowerInstagramData');

const headers = {
  'cookie': 'mid=WIYWkwAEAAG_lPLbHV_GeSgBhxYE; ig_or=landscape-primary; datr=bxqyWo-zwpMjcjOvAfkghaah; csrftoken=VHXz53J0knowbM4kMJezciLSfHn4URip; ds_user_id=494199025; rur=FRC; ig_pr=2.200000047683716; ig_vh=639; sessionid=IGSCb84d292e1374bd2c2f0bb31899963608199068692c6c3ace09cefb1a8e752b0b%3AWS6WJd99dHPJHfjBWrWvq4f2O4yBoEW7%3A%7B%22_auth_user_id%22%3A494199025%2C%22_auth_user_backend%22%3A%22accounts.backends.CaseInsensitiveModelBackend%22%2C%22_auth_user_hash%22%3A%22%22%2C%22_platform%22%3A4%2C%22_token_ver%22%3A2%2C%22_token%22%3A%22494199025%3AACktlXE2rmDHdwlkQtpvQmpYJ5VoSKgV%3A2ad7a447c3d0eebe028ba0c11c5513e4b69f196a810b96fe081d65775a1aaad2%22%2C%22last_refreshed%22%3A1522400635.3168668747%7D; ig_vw=677; fbm_124024574287414=base_domain=.instagram.com; fbsr_124024574287414=jBSnbTRWbrNgnkXzM-pWVYvaB3vzskNY-PwNwtKXnH0.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUFHS01HZnFWTjhieFh5NXhGNXJuWndNY0JIX2dGaW04bnlKYXZkSGFjUENCc3lRNG9MR0lXNWR2MFpsMkNSVlpqTHhaTUxxckh2aE5EdHg3ZUNmOTJUY2hTckN2aWFtbTJqaGNTMUYxU01IMXM1b1E0TW9rVHdkLWN4MFNfZDRVdm01SFFjOWdBUk55MHZ2WlNVODVvTXBFS3ZGRDB5UHF6cHpNSGx6cEswV1pvTXM3RW44dEl5MzRIUFVfcFpSUWlvUDBQWnVodDRHcHJhMlh2amlQQW9WTkVJS2gwTndneUFJN28wUC1BbG9GYjlkXy1VSFY3el9zTTJaNW9ieVFzVVIza21hZ05DTy00UlEzak1ZVWFiVkhlcHk4WXlIeDlPejZVc3d1RkN1YWlwSkp5Rm5ScXBERVVGZElqbmZyNmdNa1QwY2pwNzVvc1J1TnhwdUJVTFJKNGNETEwtcy1WUUFNV3pEM25SQV9mUjlIcUlQYTVVNXl6eTVvQzM4NzAiLCJpc3N1ZWRfYXQiOjE1MjI0MTQ5NjMsInVzZXJfaWQiOiIxMDAwMDE1Njk5MTk5OTIifQ; urlgen="{\"time\": 1522400635}:1f1tg4:A99cKl466_sapxFA_wd_HwfcrpM"',
}
const userStarter = {
  username: 'kmcl__',
  id: '494199025'
};
console.log(`Creating starter data with username "${userStarter.username}"...`);
 
getUserInstagramData(userStarter.username);

getFollowerInstagramRelation(userStarter.id, headers)