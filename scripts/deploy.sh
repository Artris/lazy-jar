#!/bin/bash

set -e

DEPLOY_ENV="$1"

docker build -t gcr.io/production-artris/mongo:$DEPLOY_ENV-$TRAVIS_TAG ../mongo/
docker build -t gcr.io/production-artris/app:$DEPLOY_ENV-$TRAVIS_TAG ../app/

gcloud auth activate-service-account --key-file ${TRAVIS_BUILD_DIR}/deploy.key.json
yes | gcloud auth configure-docker

docker push gcr.io/production-artris/mongo:$DEPLOY_ENV-$TRAVIS_TAG
docker push gcr.io/production-artris/app:$DEPLOY_ENV-$TRAVIS_TAG