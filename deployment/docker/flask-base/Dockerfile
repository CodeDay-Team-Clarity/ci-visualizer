FROM python:3.9.7-alpine3.14

COPY prod-requirements.txt /requirements.txt

RUN pip3 install virtualenv \
    && virtualenv venv \
    && source /venv/bin/activate \
    && pip3 install -r /requirements.txt
