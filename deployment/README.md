# Deployment

## Summary

Deploys the app to an EC2 instance as a Docker container.

- SSH into the ci-visualizer machine with `ssh -i deployment/ec2_key.pem ubuntu@builds.ci-visualizer.com`

- `app.ci-visualizer.com` points to the same IP address as `builds.ci-visualizer.com`.

- Host sharing works because Jenkins runs on port 8080, whereas the app runs on port 80, which makes the app accessible
  in the browser from the url https://app.ci-visualizer.com.

## Build the Docker image and run a container locally

- Build and start with `./deployment/dockerStart.sh`
- Put process into the background with `CTRL-Z` (CTRL-C won't work!)
- Stop and clean up with `./deployment/dockerStop.sh`
- Check with Docker images are created with `docker image ls`
- Check which Docker containers are running with `docker ps`. There is a column for the name(s) of containers.
- Look at Docker container logs with `docker logs <container name>`. For example, `docker logs flask-backend`.