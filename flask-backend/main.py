from logging import raiseExceptions
from flask import Flask, render_template, request
import json
from pull_data import JenkinsConnection, BuildMetrics
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

class JenkinsCalls():

    def __init__(self, request=None):
        self.request = request

    def doLogin(self):
        # checks if logged in with POST method -> returns status code
        if (self.request.method == 'POST'):
            args = self.request.json
            print(args)
            if "username" in args and "password" in args and "url" in args:
                return JenkinsConnection(args["url"], args["username"], args["password"])
            else:
                raise Exception("Insufficient credentials")
        return '{"response": "ok"}'
    
    def getAllJobs(self):
        if self.request != None and (self.request.method == 'GET'):
            args = self.request.args
            print(args)
            if "username" in args and "password" in args and "url" in args:
                # Get jobs
                connection = JenkinsConnection(args["url"], args["username"], args["password"])
                jenkinsInstance = BuildMetrics(connection)

                # consolidate all jobs, if no Jobs, return no jobs
                allJobNames = jenkinsInstance.getJobNames()
                if len(allJobNames) <= 0:
                    return {"response": "no jobs"}

                return {'allJobNames': allJobNames}
            else:
                raise Exception("Insufficient credentials Jobs")
        else:
            print('getJobs function : Invalid -> request = None (or POST instead of GET request)')
    
    def getJobStats(self):
        if self.request != None and (self.request.method == 'GET'):
            args = self.request.args
            print(args)
            if "username" in args and "password" in args and "url" in args and "job" in args:
                # establish connection, establish current job if it's given in the args
                connection = JenkinsConnection(args["url"], args["username"], args["password"])
                currentJobName = None
                if request.args["job"]:
                    currentJobName = self.request.args["job"]
                else: 
                    return 'Job not specified getJobStats main.py'

                # connect and get all jobs
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
            else:
                raise Exception("Insufficient credentials for getJobStats (user, pword, url)")
        else:
            print('getStats function : Invalid -> request=None (or POST instead of GET request)')

@app.route('/login', methods=['POST'])
def loginRoute():
    # If this function call fails, the route will throw an exception, and the response won't have status code 200 i.e. login failed.
    # If this function call succeeds, the login succeeded, and we'll return a 200 status code with response body {"response": "ok"}
    connection = JenkinsCalls(request)
    return connection.doLogin()

@app.route('/')
def indexRoute():
    # Test connection to server
    return "Hello, ci-visualizer user from Flask+React"

@app.route('/jobs', methods=['GET'])
def jobsRoute():
    ''' Returns all jobs showing up on the jenkins server
    needs url, user, pwrd in the request 
    Example below
    http://127.0.0.1:5000/jobs?username=jenkins&password=codeday&url=http://builds.ci-visualizer.com:8080/
    '''
    connection = JenkinsCalls(request)
    return connection.getAllJobs()

@app.route('/stats', methods=['GET'])
def statsRoute():
    ''' Returns JSON of all build statistics of one job 
    Example below, in the query string, specify a username=, password=, url=, and job= 
    http://127.0.0.1:5000/stats?job=sleeper_simulation-1&username=jenkins&password=codeday&url=http://builds.ci-visualizer.com:8080/
    '''
    connection = JenkinsCalls(request)
    return connection.getJobStats()

app.run(debug=True)
