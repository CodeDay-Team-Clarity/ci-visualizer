# CI visualizer

This holds the frontend code and the backend code.
This app gives you details on your jenkins builds like..
- The daily failure rate of your job builds
- the daily build durations
- the total statuses of your builds

## Demo

1. Go to http://app.ci-visualizer.com
2. Enter credentials:
   - username: jenkins
   - password: codeday
   - jenkins url: http://builds.ci-visualizer.com:8080/
3. Use the app!

## Here's what you will see once you login

### Jobs Dashboard:
![Dashboard](/readme_imgs/dashboard.png)

### Job Stats:
![Job Stats](/readme_imgs/job_stats.png)

### Build Durations and Failure Rate Graphs:
![Build Durations](/readme_imgs/build_durations.png)

## Development setup

In the repository's root directory, run these commands:

```
pip install virtualenv
virtualenv venv # This should create a `venv` directory
source venv/bin/activate # For windows users it will be source venv/scripts/activate
pip install -r dev-requirements.txt
```

At this point, you should be able to do:

```
python3 flask-backend/main.py
```

Then, in the frontend, have node 12.16.3 or later, and run

```
cd ci-frontend
npm install
npm start
```

#### Troubleshooting

When running 'pip install -r requirements.txt' in the virtualenv, terminal failes to recognize jenkins and throws an
exit error. if this happens run 'pip install python-jenkins'. The same thing happens for matplotlib (run 'pip install
matplotlib') and dotenv (run 'pip install python-dotenv').
