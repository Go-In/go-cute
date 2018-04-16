#! /bin/sh
npm run setup
node main.js
exec "$@"
