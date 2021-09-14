from logging import raiseExceptions
from flask import Flask, render_template, request
import json
from pull_data import JenkinsConnection, BuildMetrics
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

class JenkinsConnection_WIP:

    def __init__(self, request=None):
        self.request = request
    
    def getJobs(self):
        if self.request != None and (self.request.method == 'GET'):
            args = self.request.args
            print(args)
            if "username" in args and "password" in args and "url" in args and "job" in args:
                return JenkinsConnection(args["url"], args["username"], args["password"]), args["job"]
            else:
                raise Exception("Insufficient credentials")
        else:
            print('getJobs function : Invalid -> request = None (or POST instead of GET request)')
    
    def getStats(self):
        if self.request != None and (self.request.method == 'GET'):
            args = self.request.args
            print(args)
            if "username" in args and "password" in args and "url" in args:
                return JenkinsConnection(args["url"], args["username"], args["password"])
            else:
                raise Exception("Insufficient credentials")
        else:
            print('getStats function : Invalid -> request=None (or POST instead of GET request)')

        
def jenkinsConnectionFromRequest(request):
    if (request.method == 'GET'):
        args = request.args
        print(args)
        # if a job is specified in the request, include the job name, else don't
        if "username" in args and "password" in args and "url" in args and "job" in args:
            return JenkinsConnection(args["url"], args["username"], args["password"])
        else:
            raise Exception("Insufficient credentials")
            # return '{"response": "Error: Insufficient Credentials"}'
    elif (request.method == 'POST'):
        args = request.json
        print(args)
        if "username" in args and "password" in args and "url" in args:
            return JenkinsConnection(args["url"], args["username"], args["password"])
        else:
            raise Exception("Insufficient credentials")
            # return '{"response": "Error: Insufficient Credentials"}'
    else:
        raise Exception("No credentials")
        # return '{"response": "Error: neither POST nor GET at jenkinsConnectionFromRequest"}'


@app.route('/login', methods=['POST'])
def loginRoute():
    # If this function call fails, the route will throw an exception, and the response won't have status code 200 i.e. login failed.
    # If this function call succeeds, the login succeeded, and we'll return a 200 status code with response body {"response": "ok"}
    jenkinsConnectionFromRequest(request)
    return '{"response": "ok"}'


@app.route('/')
def indexRoute():
    return render_template("index.html", token="Hello, ci-visualizer user from Flask+React")


@app.route('/jobs', methods=['GET'])
def jobsRoute():
    ''' needs url, user, pwrd in the request '''
    connection = jenkinsConnectionFromRequest(request)
    jenkinsInstance = BuildMetrics(connection)

    # all jobs, if no Jobs, return no jobs
    allJobNames = jenkinsInstance.getJobNames()
    if len(allJobNames) <= 0:
        return {"response": "no jobs"}

    return {'allJobNames': allJobNames}


@app.route('/stats', methods=['GET'])
def statsRoute():
    ''' Returns JSON of all build statistics of one job 
    in the query string, specify a username=, password=, url=, and job=
    Example: http://127.0.0.1:5000/stats?job=sleeper_simulation-1&username=jenkins&password=codeday&url=http://builds.ci-visualizer.com:8080/
    '''
    currentJobName = None

    # connect and get all jobs
    currentJobName = request.args["job"]
    connection = jenkinsConnectionFromRequest(request)
    jenkinsInstance = BuildMetrics(connection)

    # all jobs, if no Jobs, return no jobs
    allJobNames = jenkinsInstance.getJobNames()
    if len(allJobNames) <= 0:
        error = {"response": "no jobs"}
        return error

    jenkinsInstance.populateStats(currentJobName)
    failures, successes, cancels = jenkinsInstance.getStatusCounts()
    avgDuration, buildTimestamps, buildDurations, allResults = jenkinsInstance.getDurationTimeStatus()
    # print(failures, successes, cancels, allResults, buildAvg)

    data = {
        "allJobNames": allJobNames,
        "stats": {
            "CurrentJobName": currentJobName,
            "Failures": failures,
            "Successes": successes,
            "Cancels": cancels,
            "AverageDuration": avgDuration,
            "BuildTimestamps": buildTimestamps,
            "BuildDurations": buildDurations,
            "AllResults": allResults
        }
    }

    # return data
    print('DATA ---- ')
    print(data)
    print(' -------- ')
    return json.dumps(data)


app.run(debug=True)
