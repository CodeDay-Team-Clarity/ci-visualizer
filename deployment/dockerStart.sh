#!/bin/bash

# Network
NETWORK_NAME="ci-visualizer-network"
docker network rm $NETWORK_NAME
docker network create --driver bridge $NETWORK_NAME

# Flask base
FLASK_BASE_IMAGE_NAME="ci-visualizer/flask-base"
FLASK_BASE_DOCKERFILE="deployment/docker/flask-base/Dockerfile"
docker build -f $FLASK_BASE_DOCKERFILE . -t $FLASK_BASE_IMAGE_NAME

# Flask backend
FLASK_IMAGE_NAME="ci-visualizer/flask-backend"
FLASK_CONTAINER_NAME="flask-backend"
FLASK_DOCKERFILE="deployment/docker/flask-backend/Dockerfile"
docker kill $FLASK_CONTAINER_NAME
docker rm $FLASK_CONTAINER_NAME
docker build -f $FLASK_DOCKERFILE . -t $FLASK_IMAGE_NAME
docker run -d -p 9090:9090 --network $NETWORK_NAME --name $FLASK_CONTAINER_NAME $FLASK_IMAGE_NAME

# React frontend
pushd ci-frontend
REACT_APP_CI_VISUALIZER_BACKEND_ORIGIN="http://localhost:9090" npm run build
popd
REACT_IMAGE_NAME="ci-visualizer/react-frontend"
REACT_CONTAINER_NAME="react-frontend"
REACT_DOCKERFILE="deployment/docker/react-frontend/Dockerfile"
docker kill $REACT_CONTAINER_NAME
docker rm $REACT_CONTAINER_NAME
docker build -f $REACT_DOCKERFILE . -t $REACT_IMAGE_NAME
docker run -d -p 10101:10101 --network $NETWORK_NAME --name $REACT_CONTAINER_NAME $REACT_IMAGE_NAME
