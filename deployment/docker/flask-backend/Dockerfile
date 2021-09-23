FROM robmoore121/ci-visualizer-flask-base

# Bakes source files and directories into the container image
COPY deployment/docker/flask-backend/rootfs /
COPY flask-backend /flask-backend

RUN chmod a+x /opt/docker-entrypoint.sh

CMD ["./opt/docker-entrypoint.sh"]
