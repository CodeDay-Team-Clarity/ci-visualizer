# CI visualizer

This holds the frontend code and the backend code.

## Development setup

In the repository's root directory, run these commands:

```
pip install virtualenv
virtualenv venv # This should create a `venv` directory
source venv/bin/activate # For windows users it will be source venv/scripts/activate
pip install -r requirements.txt
```

At this point, you should be able to do:

```
cd flask-backend
python3 main.py
```

Then, in the frontend, have node 12.16.3 or later, and run

```
cd ci-frontend
npm install
npm start
```

#### Troubleshooting

When running 'pip install -r requirements.txt' in the virtualenv, terminal failes to recognize jenkins and throws an exit error. if this happens run 'pip install python-jenkins'.
The same thing happens for matplotlib (run 'pip install matplotlib') and dotenv (run 'pip install python-dotenv').
