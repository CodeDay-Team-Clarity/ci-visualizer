#!/bin/sh
source venv/bin/activate
ENV=PROD PORT=9090 python3 flask-backend/main.py