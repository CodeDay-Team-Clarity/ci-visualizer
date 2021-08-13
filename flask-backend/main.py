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
        print(args)
        if "username" in args and "password" in args and "url" in args:
            return JenkinsConnection(args["url"], args["username"], args["password"])
        else:
            # raise Exception("Insufficient credentials")
            return '{"response": "Error: Insufficient Credentials"}'
    elif (request.method == 'POST'):
        args = request.json
        print(args)
        if "username" in args and "password" in args and "url" in args:
            return JenkinsConnection(args["url"], args["username"], args["password"])
        else:
            # raise Exception("Insufficient credentials")
            return '{"response": "Error: Insufficient Credentials"}'
    else:
        # raise Exception("No credentials")
        return '{"response": "Error: neither POST nor GET at jenkinsConnectionFromRequest"}'


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
    ''' Returns JSON of all build statistics of one job '''
    currentJob = None

    # connect and get all jobs
    connection = jenkinsConnectionFromRequest(request)
    jenkinsInstance = BuildMetrics(connection)

    # all jobs, if no Jobs, return no jobs
    jobNames = jenkinsInstance.getJobNames()
    if len(jobNames) <= 0:
        error = {"response": "no jobs"}
        return error

    # if a job name was not specified, get info for first job
    args = request.args()
    if "job" in args:
        currentJob = args["job"]
    else:
        currentJob = jobNames[0]

    jenkinsInstance.populateStats(currentJob)
    failures, successes, cancels = jenkinsInstance.getStatusCounts()
    avgDuration, buildTimestamps, buildDurations, allResults = jenkinsInstance.getDurationTimeStatus()
    # print(failures, successes, cancels, allResults, buildAvg)

    stats = {
        "Failures": failures, # for chart 1
        "Successes": successes, # for chart 1
        "Cancels": cancels, # for chart 1
        "AverageDuration": avgDuration, # for chart 2
        "BuildTimestamps": buildTimestamps, # for chart 2
        "BuildDurations": buildDurations, # for chart 2
        "AllResults": allResults # for chart 2
    }

    # return stats
    return json.dumps(stats)


app.run(debug=True)
