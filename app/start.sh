#!/bin/bash
# wait-for-postgres.sh

set -e

host="$1"; shift
port="$1"; shift
cmd="$@"

until curl "$host:$port" ; do
  >&2 echo "db is unavailable - sleeping"
  sleep 1
done

>&2 echo "db is up - executing command"
exec $cmd