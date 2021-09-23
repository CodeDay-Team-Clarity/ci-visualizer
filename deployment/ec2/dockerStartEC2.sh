#!/bin/bash

DOCKERHUB_ACCOUNT_NAME="robmoore121"

# Flask backend
FLASK_IMAGE_NAME="$DOCKERHUB_ACCOUNT_NAME/ci-visualizer-flask-backend"
FLASK_CONTAINER_NAME="flask-backend"
sudo docker run -d -p 9090:9090 --name $FLASK_CONTAINER_NAME $FLASK_IMAGE_NAME

# React frontend
REACT_IMAGE_NAME="$DOCKERHUB_ACCOUNT_NAME/ci-visualizer-react-frontend"
REACT_CONTAINER_NAME="react-frontend"
sudo docker run -d -p 80:10101 --name $REACT_CONTAINER_NAME $REACT_IMAGE_NAME
