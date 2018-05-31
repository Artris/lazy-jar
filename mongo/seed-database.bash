#!/bin/bash

set -E

# Start mongod and fork so docker does not exit
# TODO: make a mongo.conf file and set the ip there
/usr/bin/mongod --fork --logpath /var/log/mongodb/mongod.log --bind_ip 0.0.0.0 &
# # Restore database from dump
mongorestore --db lazyJar /home/lazyJar
exec "$@";