#!/bin/bash

function isContainerRunning() {
  local CONTAINER_NAME=$1
  if [[ $(docker ps --filter "name=$CONTAINER_NAME" --filter "status=running" --format "{{.Names}}") == $CONTAINER_NAME ]]; then
    echo "1"
  else
    echo "0"
  fi
}

function isContainerCreated() {
  local CONTAINER_NAME=$1
  if [[ $(docker ps -a --filter "name=$CONTAINER_NAME" --format "{{.Names}}") == $CONTAINER_NAME ]]; then
    echo "1"
  else
    echo "0"
  fi
}

FLASK_CONTAINER_NAME="flask-backend"
if [[ $(isContainerRunning $FLASK_CONTAINER_NAME) == "1" ]]; then
  docker kill $FLASK_CONTAINER_NAME
fi
if [[ $(isContainerCreated $FLASK_CONTAINER_NAME) == "1" ]]; then
  docker rm $FLASK_CONTAINER_NAME
fi

REACT_CONTAINER_NAME="react-frontend"
if [[ $(isContainerRunning $REACT_CONTAINER_NAME) == "1" ]]; then
  docker kill $REACT_CONTAINER_NAME
fi
if [[ $(isContainerCreated $REACT_CONTAINER_NAME) == "1" ]]; then
  docker rm $REACT_CONTAINER_NAME
fi

NETWORK_NAME="ci-visualizer-network"
if [[ $(docker network ls --filter "name=$NETWORK_NAME" --format "{{.Name}}") == $NETWORK_NAME ]]; then
  docker network rm $NETWORK_NAME
fi
