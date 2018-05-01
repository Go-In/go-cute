#!/usr/bin/python3

import sys, pymysql

# <----------------- prepare
print('preparing')

post_table_name = 'post'
like_table_name = 'likes'
timestamp = '1522515600'

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

host = host[host.find('=') + 1: -1]
user = user[pwd.find('=') + 1: -1]
pwd = pwd[pwd.find('=') + 1: -1]
db_name = db_name[db_name.find('=') + 1: -1]

init_len = len(user_list)

# <----------------- db
db = pymysql.connect( host = host , user = user, password = pwd, db = db_name, use_unicode=True, charset="utf8mb4")

c = db.cursor()

while len(user_list) > 0:
    target_id = user_list[0]
    user_list.remove(target_id)

    if target_id[0] == '#':
        continue

    if target_id[0] == '\n':
        print()
        continue

    target_id = target_id[:-1]

# <----------------- post
    post_count_command = "SELECT SUM(`like_count`) FROM `" + post_table_name + "` WHERE timestamp > " + timestamp + " AND user_id = " + target_id

    c.execute(post_count_command, [])

    post_count = c.fetchone()[0]

# <----------------- comment
    like_count_command = "SELECT COUNT(*) FROM `" + like_table_name + "` WHERE `liked` = " + target_id

    c.execute(like_count_command, [])

    like_count = c.fetchone()[0]

# <----------------- result
    if post_count == None or like_count == None:
        print(str(init_len - len(user_list)) + ' ' + target_id)
        
        continue

    print(str(init_len - len(user_list)) + ' ' + target_id + ' ' + str(bool(float(post_count) * 110.0 / 100.0 >= like_count) \
                                                                     & bool(float(post_count) * 90.0 / 100.0 <= like_count)) \
                                                                     + ' ' + str(post_count) + ' ' + str(like_count) )

db.close()
