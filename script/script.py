import requests

print('Starting...')
user = 'kmcl__'
path = 'https://www.instagram.com/' + user + '/?__a=1'

r = requests.get(path)
data = r.json()

print(data['graphql']['user']['id'])
