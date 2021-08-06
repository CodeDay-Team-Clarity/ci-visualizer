from logging import raiseExceptions
from flask import Flask, render_template, request
import json
from pull_data import JenkinsConnection, BuildMetrics
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)


def jenkinsConnectionFromRequest(request):
    if (request.method == 'GET'):
        args = request.args
        if "username" in args and "password" in args and "url" in args:
            return JenkinsConnection(args["url"], args["username"], args["password"])
        else:
            raise Exception("Insufficient credentials")
    elif (request.method == 'POST'):
        args = request.json
        print(args)
        if "username" in args and "password" in args and "url" in args:
            return JenkinsConnection(args["url"], args["username"], args["password"])
        else:
            raise Exception("Insufficient credentials")
    else:
        raise Exception("No credentials")


@app.route('/login', methods=['POST'])
def login():
    # If this function call fails, the route will throw an exception, and the response won't have status code 200 i.e. login failed.
    # If this function call succeeds, the login succeeded, and we'll return a 200 status code with response body {"response": "ok"}
    jenkinsConnectionFromRequest(request)
    return '{"response": "ok"}'


@app.route('/')
def index():
    return render_template("index.html", token="Hello, ci-visualizer user from Flask+React")


@app.route('/stats', methods=['GET'])
def getStats():
    ''' Returns as JSON file of all build statistics '''
    connection = jenkinsConnectionFromRequest(request)
    job = BuildMetrics(connection)
    job.populateStats()
    failures, successes, cancels, allResults, buildAvg = job.getStats()
    # print(failures, successes, cancels, allResults, buildAvg)

    stats = {
        "Failures": failures,
        "Successes": successes,
        "Cancels": cancels,
        "AllResults": allResults,
        "Average": buildAvg
    }

    # return stats
    return json.dumps(stats)


app.run(debug=True)
