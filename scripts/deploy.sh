#!/bin/bash

set -e

cd ${TRAVIS_BUILD_DIR}/scripts

docker build -t gcr.io/production-artris/mongo ../mongo/
docker build -t gcr.io/production-artris/app ../app/

gcloud auth activate-service-account --key-file ../deploy.json
yes | gcloud auth configure-docker

docker push gcr.io/production-artris/mongo:latest
docker push gcr.io/production-artris/app:latest