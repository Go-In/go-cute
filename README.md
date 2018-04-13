# go-cute

## scripts_node

### Installation
```
cd scripts_node
yarn
```
### Setup
1. crate `.env` file from `.env_sample` & insert env variables
2. connect database in `connection.js`.
3. insert starter Instagram username in `startData.js` and add `cookie` from Instagram website.
4. run `npm run setup` to create table and starter data.
5. run `npm run drop-table` to clear database.
6. add `cookie` to `main.js`
7. `node main.js` to start worker.
