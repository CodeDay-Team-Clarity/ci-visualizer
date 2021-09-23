#!/bin/bash

if [[ $(pwd | xargs basename) != "ci-visualizer" ]]; then
  echo "Run this from the repository root i.e. ./deployment/dockerBuild.sh"
  exit 1
fi

if [[ "$1" != "--flask-backend-origin" || "$#" != 2 ]]; then
  echo "Usage: $0 --flask-backend-origin <deployed flask-backend origin>"
  exit 1
fi
CI_VISUALIZER_BACKEND_ORIGIN=$2

./deployment/dockerStop.sh

function removeImageAndTags() {
  local IMAGE_NAME=$1
  if [[ $(docker images --filter "reference=$IMAGE_NAME" --format "{{.Repository}}") == $IMAGE_NAME ]]; then
    docker image rm -f $(docker images --filter "reference=$IMAGE_NAME" --format "{{.ID}}")
  fi
}

function buildImage() {
  local IMAGE_NAME="ci-visualizer-$1"
  local DOCKERFILE="deployment/docker/$1/Dockerfile"
  removeImageAndTags $IMAGE_NAME
  docker build -f $DOCKERFILE . -t $IMAGE_NAME
  local DOCKERHUB_ACCOUNT_NAME="robmoore121"
  docker tag $IMAGE_NAME "$DOCKERHUB_ACCOUNT_NAME/$IMAGE_NAME"
}

function buildReact() {
  pushd ci-frontend
  REACT_APP_CI_VISUALIZER_BACKEND_ORIGIN="$CI_VISUALIZER_BACKEND_ORIGIN" npm run build
  popd
}

buildImage "flask-base"
buildImage "flask-backend"
buildReact
buildImage "react-frontend"