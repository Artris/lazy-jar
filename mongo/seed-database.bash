#!/bin/bash

set -E

# Start mongod and fork so docker does not exit
# TODO: make a mongo.conf file and set the ip there
/usr/bin/mongod --logpath /var/log/mongodb/mongod.log --bind_ip 0.0.0.0 &
mongorestore --db lazyJar /home/lazyJar
/usr/bin/mongod --shutdown
/usr/bin/mongod --logpath /var/log/mongodb/mongod.log --bind_ip 0.0.0.0