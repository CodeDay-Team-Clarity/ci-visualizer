#!/bin/bash

if [[ $(pwd | xargs basename) != "ci-visualizer" ]]; then
  echo "Run this from the repository root i.e. ./deployment/dockerBuild.sh"
  exit 1
fi

DOCKERHUB_ACCOUNT_NAME="robmoore121"

# Authenticate with DockerHub to enable pushing images to the registry
docker login --username $DOCKERHUB_ACCOUNT_NAME

# Build images for production
./deployment/dockerBuild.sh --flask-backend-origin "http://app.ci-visualizer.com:9090"

# Push images to DockerHub, where they can be pulled by anyone (for example, by an EC2 instance)
docker push "$DOCKERHUB_ACCOUNT_NAME/ci-visualizer-flask-base"
docker push "$DOCKERHUB_ACCOUNT_NAME/ci-visualizer-flask-backend"
docker push "$DOCKERHUB_ACCOUNT_NAME/ci-visualizer-react-frontend"