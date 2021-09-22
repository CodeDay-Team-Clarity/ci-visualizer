FROM ci-visualizer/flask-base

COPY deployment/docker/flask-backend/rootfs /
COPY flask-backend /flask-backend
COPY prod-requirements.txt /requirements.txt

RUN chmod a+x /opt/docker-entrypoint.sh

CMD ["./opt/docker-entrypoint.sh"]
