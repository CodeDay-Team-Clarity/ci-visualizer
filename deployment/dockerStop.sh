#!/bin/bash

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

killIfRunning "flask-backend"
removeIfCreated "flask-backend"
killIfRunning "react-frontend"
removeIfCreated "react-frontend"
