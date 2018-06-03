#!/bin/bash

set -E

# Start mongod and fork so docker does not exit
# TODO: make a mongo.conf file and set the ip there

(
    # https://stackoverflow.com/questions/14612371/how-do-i-run-multiple-background-commands-in-bash-in-a-single-line
    sleep 10; mongorestore --db lazyJar /home/lazyJar;
    # https://gist.github.com/subfuzion/08c5d85437d5d4f00e58
    curl -d '{ready: "OK"}' -H "Content-Type: application/json" -X POST http://app:3030/seed
) &

/usr/bin/mongod --logpath /var/log/mongodb/mongod.log --bind_ip 0.0.0.0