# Deployment

## Build the Docker images and run the containers locally

- Build and start with `./deployment/dockerStart.sh`
- Check running containers with `docker ps`. There is a column in the default output for the name(s) of containers.
- Stop with `./deployment/dockerStop.sh`
- Check with Docker images are created with `docker image ls`
- Look at Docker container logs with `docker logs <container name>`. For example, `docker logs flask-backend`.

## Push Docker images to the DockerHub registry

- Build production images and push them to DockerHub `./deployment/deployToDockerhub.sh`

## Run the production app on EC2

Prerequisite: You need the SSH key stored as `deployment/ec2_key.pem`. It's on Rob's machine.

- Run `./deployment/ec2/deployToEC2.sh`, which puts the installation script onto the box.
- SSH into the ci-visualizer machine with `ssh -i deployment/ec2_key.pem ubuntu@app.ci-visualizer.com` and run
`./dockerStartEC2.sh` which pulls and starts the containers.

Example of deployment commands:

```
rob@mac $ ./deployment/deployToDockerHub.sh # Rebuild and deploy images to DockerHub.
rob@mac $ ./deployment/ec2/deployToEC2.sh   # Copy the installation script onto the EC2 VM. Requires the deployment/ec2_key.pem SSH key file.

rob@mac $ ssh -i deployment/ec2_key.pem ubuntu@app.ci-visualizer.com # SSH into the EC2 VM.
ubuntu@ec2:~$ ./dockerStartEC2.sh # Run the installer, which re-pulls the images, and restarts the containers.
```

## Notes on infrastructure

- `app.ci-visualizer.com` points to the same IP address as `builds.ci-visualizer.com`.
- Having everything run on the same host works because Jenkins runs on host port 8080, whereas the app runs on host port
  80, which makes the app accessible in the browser from the url https://app.ci-visualizer.com.
