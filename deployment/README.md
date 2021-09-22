# Deployment

Deploys the app to an EC2 instance as a Docker container.

- SSH into the ci-visualizer machine with `ssh -i deployment/ec2_key.pem ubuntu@builds.ci-visualizer.com`

- `app.ci-visualizer.com` points to the same IP address as `builds.ci-visualizer.com`.

- Host sharing works because Jenkins runs on port 8080, whereas the app runs on port 80, which makes the app accessible in the browser from the url https://app.ci-visualizer.com.