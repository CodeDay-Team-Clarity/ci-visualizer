#!/bin/bash

FLASK_CONTAINER_NAME="flask-backend"
docker kill $FLASK_CONTAINER_NAME
docker rm $FLASK_CONTAINER_NAME

REACT_CONTAINER_NAME="react-frontend"
docker kill $REACT_CONTAINER_NAME
docker rm $REACT_CONTAINER_NAME

NETWORK_NAME="ci-visualizer-network"
docker network rm $NETWORK_NAME