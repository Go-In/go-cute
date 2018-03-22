import requests
import time

print('Starting...')

headers = {
  'cookie': ''
}
user = 'kmcl__'
path = 'https://www.instagram.com/' + user + '/?__a=1'

r_user = requests.get(path, headers=headers)
user_data = r_user.json()

current_user_id = user_data['graphql']['user']['id']
current_user_name = user_data['graphql']['user']['username']
print('user: ' + current_user_id + ', ' + current_user_name)

count = 0
round = 0
users = []
finded = []

follower_path = 'https://www.instagram.com/graphql/query/?query_hash=37479f2b8209594dde7facb0d904896a&variables=%7B%22id%22%3A%22' + current_user_id +'%22%2C%22first%22%3A1000%7D'
r_follower = requests.get(follower_path, headers=headers)
follower_data = r_follower.json()
follower_edges = follower_data['data']['user']['edge_followed_by']['edges']
finded.append(current_user_id)

for edge in follower_edges:
  users.append(edge['node']['id'])
  print(edge['node']['username'] + ', ' + edge['node']['id'] + ', ' + current_user_name)
  count += 1
round += 1
print('round: ' + str(round) + ', ' + str(count))


for user in users:
  current_user_id = user
  if current_user_id not in finded:
    follower_path = 'https://www.instagram.com/graphql/query/?query_hash=37479f2b8209594dde7facb0d904896a&variables=%7B%22id%22%3A%22' + current_user_id +'%22%2C%22first%22%3A1000%7D'
    # print('path: ' + follower_path)
    time.sleep(5)
    print('Requesting...')
    r_follower = requests.get(follower_path, headers=headers)
    follower_data = r_follower.json()
    if follower_data['data']:
      follower_edges = follower_data['data']['user']['edge_followed_by']['edges']
      finded.append(current_user_id)
      for edge in follower_edges:
        users.append(edge['node']['id'])
        print(edge['node']['username'] + ', ' + edge['node']['id'] + ', ' + current_user_id)
        count += 1
    round += 1
    print('round: ' + str(round) + ', ' + str(count))
print(count)
print('End...')
