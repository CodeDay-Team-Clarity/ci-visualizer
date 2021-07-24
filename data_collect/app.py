from flask import Flask 
import json
from pull_data import BuildMetrics, main
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

@app.route('/')
def index():
    return "Hello, ci-visualizer user"

@app.route('/stats')
def getStats():
    ''' Returns as JSON file of all build statistics '''
    USER = os.getenv('USERNAME')
    PASS = os.getenv('PASSWORD')

    job = BuildMetrics(USER, PASS)
    job.connectToJenkins()
    job.populateStats()
    failures, successes, cancels, allResults, buildAvg = job.getStats()
    print(failures, successes, cancels, allResults, buildAvg)

    stats = {
        "Failures": failures, 
        "Successes": successes, 
        "Cancels": cancels,
        "All Results:": allResults,
        "Average": buildAvg
    }

    # return stats
    return json.dumps(stats)

if __name__ == "__main__":
    app.run(debug=True)
