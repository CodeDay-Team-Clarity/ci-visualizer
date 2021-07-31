from flask import Flask, render_template, request
import json
from pull_data import BuildMetrics, runInstance
import os
from dotendsv import load_dotenv
load_dotenv()

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html", token="Hello, ci-visualizer user from Flask+React")

@app.route('/stats', methods = ['GET'])
def getStats():
    ''' Returns as JSON file of all build statistics '''
    USER = os.getenv('USERNAME')
    PASS = os.getenv('PASSWORD')
    URL = None

    args = request.args
    # print("QUERY STRING: ", request.query_string)
    if "username" in args and "password" in args and "url" in args: 
        USER = args["username"]
        PASS = args["password"]
        URL = args["url"]
    else: 
        return "Insufficient Login Credentials"

    job = BuildMetrics(URL, USER, PASS)
    job.connectToJenkins()
    job.populateStats()
    failures, successes, cancels, allResults, buildAvg = job.getStats()
    # print(failures, successes, cancels, allResults, buildAvg)

    stats = {
        "Failures": failures, 
        "Successes": successes, 
        "Cancels": cancels,
        "All Results:": allResults,
        "Average": buildAvg
    }

    # return stats
    return json.dumps(stats)

app.run(debug=True)
