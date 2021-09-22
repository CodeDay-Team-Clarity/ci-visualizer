# Flask base
BASE_IMAGE_NAME="ci-visualizer/flask-base"
docker build -f deployment/docker/flask-base/Dockerfile . -t $BASE_IMAGE_NAME

# Flask backend
IMAGE_NAME="ci-visualizer/flask-backend"
CONTAINER_NAME="flask-backend"
docker kill $CONTAINER_NAME
docker rm $CONTAINER_NAME
docker build -f deployment/docker/flask-backend/Dockerfile . -t $IMAGE_NAME
docker run --name $CONTAINER_NAME $IMAGE_NAME