#!/bin/bash

set -e

DEPLOY_ENV="$1"
VERSION="$2"

docker build -t gcr.io/production-artris/mongo:$DEPLOY_ENV-$VERSION ../mongo/
docker build -t gcr.io/production-artris/app:$DEPLOY_ENV-$VERSION ../app/

gcloud auth activate-service-account --key-file ${TRAVIS_BUILD_DIR}/deploy.key.json
yes | gcloud auth configure-docker

docker push gcr.io/production-artris/mongo:$DEPLOY_ENV-$VERSION
docker push gcr.io/production-artris/app:$DEPLOY_ENV-$VERSION