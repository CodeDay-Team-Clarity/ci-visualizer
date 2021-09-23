FROM node:12-alpine3.14

COPY deployment/docker/react-frontend/rootfs /
COPY ci-frontend/build /build

RUN chmod a+x /opt/docker-entrypoint.sh

CMD ["./opt/docker-entrypoint.sh"]
