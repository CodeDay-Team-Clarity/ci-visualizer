import sys
import logging
import waitress
import jenkins
from flask import Flask, render_template, request, Response
import json
from pull_data import JobMetrics, BuildMetrics
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

class JenkinsCalls():

    def __init__(self, request=None):
        self.request = request
        server = None
    
    def jenkinsConnection(self, url, username, password):
        # setup a connection to Jenkins server
        self.server = jenkins.Jenkins(url, username, password)
        # verify logged in
        user = self.server.get_whoami()
        version = self.server.get_version()
        print('Hello %s from Jenkins %s' % (user['fullName'], version))
        return self.server

    def doLogin(self):
        # checks if logged in with POST method -> returns status code
        if (self.request.method == 'POST'):
            args = self.request.json
            logging.info(f"Received request with data '{args}'")
            if not ("username" in args and "password" in args and "url" in args):
                raise Exception("Insufficient credentials")
        return '{"response": "ok"}'
    
    def getAllJobs(self):
        ''' Returns to /jobs a list of all Job names AND their dashboard data ( calls getJobStats )
        Dashboard data includes: Avg duration of all builds, cumulative results, and SOON: failure rate.
        '''
        if self.request != None and (self.request.method == 'GET'):
            args = self.request.args
            print(args)
            if "username" in args and "password" in args and "url" in args:
                # establish connection
                connection = self.jenkinsConnection(args["url"], args["username"], args["password"])
                jenkinsInstance = JobMetrics(connection)

                # consolidate all jobs, if no Jobs, return no jobs
                allJobNames = jenkinsInstance.getAllJobNames()
                if len(allJobNames) <= 0: # Check if jobs exist
                    return {"response": "no jobs"}

                allJobStats = jenkinsInstance.getAllJobStats()
                return {'Job Stats': allJobStats}
            else:
                raise Exception("Insufficient credentials Jobs")
        else:
            print('getJobs function : Invalid -> request = None (or POST instead of GET request)')
    
    def getJobStats(self):
        ''' Returns the /stats for a Job (job is based into query argument) '''
        if self.request != None and (self.request.method == 'GET'):
            args = self.request.args
            print(args)
            if "username" in args and "password" in args and "url" in args and "job" in args:
                # establish connection
                connection = self.jenkinsConnection(args["url"], args["username"], args["password"])
                # establish current job 
                current_job_name = self.request.args["job"]
                # connect and get all jobs
                pipeline_instance = BuildMetrics(connection, current_job_name)
                # get job data
                results_counts = pipeline_instance.getResultsCounts()
                duration_data = pipeline_instance.getBuildDurations()
                # compile job data
                data = {}
                data.update(results_counts)
                data.update(duration_data)

                # if len(allJobNames) <= 0:
                #     error = {"response": "no jobs"}
                #     return error

                print('BUILD DATA FOR A JOB ---- ')
                print(data)
                print(' ----------------------- ')
                # return json.dumps(data)
                return data
            else:
                raise Exception("Insufficient credentials for getJobStats (user, pword, url)")
        else:
            print('getStats function : Invalid -> request=None (or POST instead of GET request)')

def corsResponse(responseBody):
    response = Response(responseBody)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@app.route('/login', methods=['POST'])
def loginRoute():
    # If this function call fails, the route will throw an exception, and the response won't have status code 200 i.e. login failed.
    # If this function call succeeds, the login succeeded, and we'll return a 200 status code with response body {"response": "ok"}
    connection = JenkinsCalls(request)
    return corsResponse(connection.doLogin())

@app.route('/')
def indexRoute():
    # Test connection to server
    # http://127.0.0.1:5000/
    return corsResponse("Hello, ci-visualizer user from Flask+React")

@app.route('/jobs', methods=['GET'])
def jobsRoute():
    ''' Returns all jobs showing up on the jenkins server
    needs url, user, pwrd in the request 
    Example below
    http://127.0.0.1:5000/jobs?username=jenkins&password=codeday&url=http://builds.ci-visualizer.com:8080/
    '''
    connection = JenkinsCalls(request)
    return corsResponse(connection.getAllJobs())

@app.route('/stats', methods=['GET'])
def statsRoute():
    ''' Returns JSON of all build statistics of one job 
    Example below, in the query string, specify a username=, password=, url=, and job= 
    http://127.0.0.1:5000/stats?job=sleeper_simulation-1&username=jenkins&password=codeday&url=http://builds.ci-visualizer.com:8080/
    '''
    connection = JenkinsCalls(request)
    return corsResponse(connection.getJobStats())

if __name__ == "__main__":
    env = os.getenv("ENV")
    if env == "PROD":
        serverPort = int(os.getenv("PORT", "5000"))
        logging.basicConfig(stream=sys.stdout, level=logging.INFO)
        logging.info('Configured ci-visualizer backend logging')
        logging.getLogger('waitress').setLevel(logging.INFO)
        waitress.serve(app, host="0.0.0.0", port=serverPort)
    else:
        app.run(debug=True)
