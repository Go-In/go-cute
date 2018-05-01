#!/usr/bin/python3

import sys, requests, json, pymysql

# <----------------- prepare
print('preparing')

def entry_url(user_id):
    return 'https://www.instagram.com/graphql/query/?query_hash=9ca88e465c3f866a76f7adee3871bdd8&variables={"user_id":"' + user_id + '","include_chaining":false,"include_reel":true,"include_suggested_users":false,"include_logged_out_extras":false,"include_highlight_reels":false}'

def target_url(username):
    return 'https://www.instagram.com/' + username + '/'

table_name = 'bnk_users'
columns = ['`user_id`', \
            '`full_name`', \
            '`username`', \
            '`biography`', \
            '`edge_followed_by`', \
            '`edge_follow`', \
            '`is_private`', \
            '`profile_pic_url`', \
            '`media_count`']
columns_string = ''
values_string = ''

for element in columns:
    columns_string = columns_string + element + ', '
    values_string = values_string + '%s, '

columns_string = columns_string[:-2]
values_string = values_string[:-2]

# <----------------- get param
print('getting param')

f = open(sys.argv[1], 'r')

user_list = f.readlines()

f.close()

f = open(sys.argv[2], 'r')

env = f.readlines()

f.close()

host = env[0]
user = env[1]
pwd = env[2]
db_name = env[3]
cookie = env[5]

host = host[host.find('=') + 1: -1]
user = user[pwd.find('=') + 1: -1]
pwd = pwd[pwd.find('=') + 1: -1]
db_name = db_name[db_name.find('=') + 1: -1]
cookie = cookie[cookie.find('=') + 1: -1]

# <----------------- entry request
print('creating session')

s = requests.session()

s.headers.update({'cookie' : cookie})

while len(user_list) > 0:
    target_id = user_list[0]
    user_list.remove(target_id)

    if (target_id[0] == '#') | (target_id[0] == '\n'):
        continue

    target_id = target_id[:-1]

    print('fetching ' + target_id)

    r = s.get(entry_url(target_id))

    if r.status_code != requests.codes.ok:
        print(r.status_code)

        user_list.append(target_id)
        continue

# <----------------- entry json
    entry_json = json.loads(r.text)

    target_username = entry_json['data']['user']['reel']['owner']['username']

# <----------------- target request
    print('fetching ' + target_username + ' data')

    r = s.get(target_url(target_username))

    if r.status_code != requests.codes.ok:
        print(r.status_code)

        user_list.append(target_id)
        continue

# <----------------- target json
    target_html = r.text

    target_json = json.loads(target_html.split('sharedData =')[1].split(';</script>')[0])

    target_data = target_json['entry_data']['ProfilePage'][0]['graphql']['user']

# <----------------- insert values
    insert_values = [target_data['id'], \
                     target_data['full_name'], \
                     target_data['username'], \
                     target_data['biography'], \
                     target_data['edge_followed_by']['count'], \
                     target_data['edge_follow']['count'], \
                     target_data['is_private'], \
                     target_data['profile_pic_url'], \
                     target_data['edge_owner_to_timeline_media']['count']]

    insert_values = list(map(str, insert_values))

    insert_values[3] = insert_values[3].replace('\n', '')
    insert_values[3] = insert_values[3].replace('\r', '')

    insert_values[-3] = str(int(bool(insert_values[-3])))

# <----------------- db
    print('writing ' + target_username + ' data to DB')

    db = pymysql.connect( host = host , user = user, password = pwd, db = db_name, use_unicode=True, charset="utf8mb4")

    c = db.cursor()

    insert_command = "INSERT INTO `" + table_name + "` (" + columns_string + ") VALUES (" + values_string + ")"

    c.execute(insert_command, insert_values)

    db.commit()

s.close()
db.close()
