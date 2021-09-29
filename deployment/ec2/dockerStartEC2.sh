#!/bin/bash

if [[ $(whoami) != "root" ]]; then
  echo "This script needs to be run as root. Try 'sudo $0'"
  exit 1
fi

DOCKERHUB_ACCOUNT_NAME="robmoore121"

function killIfRunning() {
  local CONTAINER_NAME=$1
  if [[ $(docker ps --filter "name=$CONTAINER_NAME" --filter "status=running" --format "{{.Names}}") == $CONTAINER_NAME ]]; then
    docker kill $CONTAINER_NAME
  fi
}

function removeIfCreated() {
  local CONTAINER_NAME=$1
  if [[ $(docker ps -a --filter "name=$CONTAINER_NAME" --format "{{.Names}}") == $CONTAINER_NAME ]]; then
    docker rm $CONTAINER_NAME
  fi
}

FLASK_CONTAINER_NAME="flask-backend"
killIfRunning "flask-backend"
removeIfCreated "flask-backend"

REACT_CONTAINER_NAME="react-frontend"
killIfRunning "react-frontend"
removeIfCreated "react-frontend"

# Flask backend
FLASK_IMAGE_NAME="$DOCKERHUB_ACCOUNT_NAME/ci-visualizer-flask-backend"
docker rmi $FLASK_IMAGE_NAME
docker run -d -p 9090:9090 --name $FLASK_CONTAINER_NAME $FLASK_IMAGE_NAME

# React frontend
REACT_IMAGE_NAME="$DOCKERHUB_ACCOUNT_NAME/ci-visualizer-react-frontend"
docker rmi $REACT_IMAGE_NAME
docker run -d -p 80:10101 --name $REACT_CONTAINER_NAME $REACT_IMAGE_NAME
