#!/bin/bash

if [[ $(pwd | xargs basename) != "ci-visualizer" ]]; then
  echo "Run this from the repository root i.e. ./deployment/ec2/deployToEC2.sh"
  exit 1
fi

scp -i deployment/ec2_key.pem deployment/ec2/dockerStartEC2.sh ubuntu@app.ci-visualizer.com:/home/ubuntu
