FROM python:3.9.7-alpine3.14

# Installing Python dependencies in a base image means that we can rebuild the flask-backend image without
# re-downloading all the dependencies. When the dependencies change, the base image should automatically rebuild itself
# by detecting a change in the prod-requirements.txt
COPY prod-requirements.txt /requirements.txt
RUN pip3 install virtualenv \
    && virtualenv venv \
    && source /venv/bin/activate \
    && pip3 install -r /requirements.txt
