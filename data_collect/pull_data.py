import sys, getopt 
import jenkins 
import matplotlib.pyplot as plt
import matplotlib 
import time 
import numpy as np
from datetime import datetime 

class BuildMetrics: 
    username = ''
    password = ''
    server = None
    # ALL STATS: 
    buildFailures = 0
    buildSuccesses = 0
    allResults = []
    buildDurations = [] # y axis for durations
    buildTimestamps = [] # x axis for date
    totalNumberBuilds = 0.0
    totalDuration = 0.0

    def __init__(self, username, password):
        self.username = username
        self.password = password 

    def connectToJenkins(self):
        # new connection to Jenkins server
        self.server = jenkins.Jenkins('http://localhost:8080', self.username, self.password)
        # verify logged in 
        user = self.server.get_whoami()
        version = self.server.get_version()
        print('Hello %s from Jenkins %s' % (user['fullName'], version))
    
    
    def getStats(self):
        # print('------------ Build Stats ---------------')
        # print('Total Failures: ', self.buildFailures)
        # print('Total Successes: ', self.buildSuccesses)
        # print('All Results: ', self.allResults)

        averageDuration = (self.totalDuration / self.totalNumberBuilds)
        # print("Average Build Duration %.2f " % averageDuration)
        return [self.buildFailures, self.buildSuccess, self.allResults, averageDuration]

    def populateStats(self):
        # return all jobs
        jenkinsJobs = self.server.get_all_jobs()
        print(jenkinsJobs)

        # JOB INFO
        my_job = self.server.get_job_info('ci-simulation', 0, True)
        # for key,value in my_job.items():
        #     print(key," -> ", value)

        # BUILD INFO
        myJobBuilds = my_job.get('builds')
        for build in myJobBuilds:
            buildNumber = build.get('number')
            buildInfo = self.server.get_build_info('ci-simulation', buildNumber)
            # UNCOMMENT TO SEE FULL BUILD INFO
            # for key,value in buildInfo.items(): 
            #     print(key, ' -> ', value)

            buildName = buildInfo.get('fullDisplayName')
            buildResult = buildInfo.get('result')
            self.allResults.append([buildName, buildResult])
            if buildResult == "FAILURE": 
                self.buildFailures += 1
            elif buildResult == "SUCCESS": 
                self.buildSuccess += 1

            buildTimestamp = buildInfo.get('timestamp')
            buildDuration = (buildInfo.get('duration'))/1000 # convert to seconds
            self.buildDurations.append(buildDuration)
            self.buildTimestamps.append(buildTimestamp)
            self.totalDuration += buildDuration
            self.totalNumberBuilds += 1.0 

        # print('Timestamps: ', self.buildTimestamps)
        # print('Durations: ', self.buildDurations)
    
    def convertTimestamps(self):
        # convert to human readable 
        dates = []
        # iterate timestamps 
        for timestamp in self.buildTimestamps: 
            # create new date/time obj
            dateTimeObj = datetime.fromtimestamp((timestamp/1000))
            dates.append(dateTimeObj)
        return dates
    
    def plotJobDuration(self):
        dateTimeObjs = self.convertTimestamps()
        dates = matplotlib.dates.date2num(dateTimeObjs)
        # npArr = self.runningMean()
        plt.plot_date(dates, self.buildDurations, '-')
        plt.xlabel('Time of Execution')
        plt.ylabel('Build Duration (Seconds)')
        plt.title('Build Durations Over Time')
        plt.gcf().autofmt_xdate()
        plt.show()

    def runningMean(self):
        ''' Helps us identify trends in the data by convolving 
        Sacrificing exact time of the jobs -> to see trends
        '''
        npArr = np.convolve(self.buildDurations, np.ones((10,))/10, mode='valid')
        return npArr

def main(argv): 

    # store username and pword as arg variables
    username = '' 
    password = ''

    try: 
        # -h help, -u user, -p pword
        opts, args = getopt.getopt(argv, "hu:p:", ["username:", "password:"])
    except getopt.GetopError:
        print('python Job-Duration-Metrics -u <username> -p <password>')
        sys.exit(2)
    # get username and password from input
    for opt, arg in opts: 
        if opt == '-h':
            print('python Job-Duration-Metrics -u <username> -p <password>')
            sys.exit()
        elif opt == '-u':
            username = arg
        elif opt == '-p':
            password = arg

    job = BuildMetrics(username, password)
    job.connectToJenkins()
    job.populateStats()
    job.getStats()
    # job.plotJobDuration()



if __name__ == "__main__":
    main(sys.argv[1:])