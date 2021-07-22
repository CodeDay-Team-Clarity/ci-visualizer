from flask import Flask 
import json
from pull_data import BuildMetrics

app = Flask(__name__)

@app.route('/')
def index():
    return "Hello, API User"

@app.route('/getStats/')
def getStats():
    ''' Returns as JSON file of all build statistics '''
    job = BuildMetrics(username, password)
    job.connectToJenkins()
    job.populateStats()
    fails, success, allresults, avg = job.getStats()
    print(failures, successes, allResults, buildAvg)

    stats = {
        "Failures": failures, 
        "Successes": successes, 
        "All Results:": allResults,
        "Average": buildAvg
    }

    return json.dumps(stats)

if __name__ == "__main__":
    app.run(debug=True)
