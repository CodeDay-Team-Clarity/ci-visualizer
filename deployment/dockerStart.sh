#!/bin/bash

if [[ $(pwd | xargs basename) != "ci-visualizer" ]]; then
  echo "Run this from the repository root i.e. ./deployment/dockerStart.sh"
  exit 1
fi

./deployment/dockerStop.sh
./deployment/dockerBuild.sh --flask-backend-origin "http://localhost:9090"

# Network
NETWORK_NAME="ci-visualizer-network"
docker network create --driver bridge $NETWORK_NAME

# Flask backend
FLASK_IMAGE_NAME="ci-visualizer-flask-backend"
FLASK_CONTAINER_NAME="flask-backend"
docker run -d -p 9090:9090 --network $NETWORK_NAME --name $FLASK_CONTAINER_NAME $FLASK_IMAGE_NAME

# React frontend
REACT_IMAGE_NAME="ci-visualizer-react-frontend"
REACT_CONTAINER_NAME="react-frontend"
docker run -d -p 10101:10101 --network $NETWORK_NAME --name $REACT_CONTAINER_NAME $REACT_IMAGE_NAME
