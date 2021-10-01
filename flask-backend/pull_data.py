from datetime import datetime


class JobMetrics:

    def __init__(self, jenkins_connection, limit=10):
        self.server = jenkins_connection  # jenkinsConnection instance from main.py
        self.limit = limit  # limit on number of jobs
        self.all_job_names = []
        # summary of all jobs for dashboard
        self.all_job_stats = {}

    def getAllJobNames(self):
        ''' Returns names of all jobs '''
        jenkins_jobs = self.server.get_all_jobs()
        # reset the list of names
        self.all_job_names = []
        for job in jenkins_jobs:
            self.all_job_names.append(str(job['name']))
        return self.all_job_names[:self.limit]  # LIMIT

    def getAllJobStats(self):
        ''' Returns for the jobs dashboard: names, results counts, and avg duration of all jobs passed in '''
        self.all_job_names = self.getAllJobNames()
        jenkins_jobs = self.server.get_all_jobs()
        for job in jenkins_jobs:
            # given each individual job, create a build metrics for each job
            build_metrics = BuildMetrics(self.server, job['name'])
            results_counts = build_metrics.getResultsCounts()
            duration_data = build_metrics.getBuildDurations()
            average_duration = int(duration_data['durations']['total_duration']) / int(
                duration_data['durations']['total_build_count'])
            self.all_job_stats[job['name']] = {}
            self.all_job_stats[job['name']].update(results_counts)
            self.all_job_stats[job['name']]['avg_duration'] = average_duration
        return self.all_job_stats


class BuildMetrics:

    def __init__(self, server, job_name):
        self.server = server
        self.job_name = job_name
        self.results_counts = {'success': 0, 'failure': 0, 'cancel': 0}
        self.duration_data = {'all_data': {}}
        self.total_duration = 0
        self.total_build_count = 0
        self.fail_rates = {}

    def getResultsCounts(self):
        # JOB INFO
        current_job = self.server.get_job_info(str(self.job_name), 0, True)
        # for key,value in current_job.items():
        #     print(key," -> ", value)

        # BUILD INFO
        job_builds = current_job.get('builds')
        # loop builds for current job
        for build in job_builds:
            build_number = build.get('number')
            build_info = self.server.get_build_info(
                self.job_name, build_number)
            build_result = build_info.get('result')
            # tally the results in the dictionary
            if build_result == "FAILURE":
                self.results_counts['failure'] += 1
            elif build_result == "SUCCESS":
                self.results_counts['success'] += 1
            else:
                self.results_counts['cancel'] += 1

        return {'results': self.results_counts}

    def getBuildDurations(self):
        ''' Should send an array with the daily average durations 
        for past two weeks'''
        # JOB INFO
        current_job = self.server.get_job_info(str(self.job_name), 0, True)
        # for key,value in current_job.items():
        #     print(key," -> ", value)

        # BUILD INFO
        timestamps = []
        durations = []
        job_builds = current_job.get('builds')
        for build in job_builds:
            build_number = build.get('number')
            build_info = self.server.get_build_info(
                self.job_name, build_number)

            # build data for 'all data'
            build_name = build_info.get('fullDisplayName')
            dateTimeObj = datetime.fromtimestamp(
                build_info.get('timestamp')/1000)
            build_timestamp = dateTimeObj.strftime("%m/%d/%Y")
            build_duration = (build_info.get('duration')) / \
                1000  # convert to seconds
            # new dictionary entry for all durations
            self.duration_data['all_data'][build_name] = {
                'duration': build_duration, 'timestamp': build_timestamp}
            # accumulate for dailyAverage
            timestamps.append(build_info.get('timestamp'))
            durations.append(build_duration)

            self.total_duration += int(build_duration)
            self.total_build_count += 1

        dailyAverages = self.dailyAverage(durations, timestamps)
        self.duration_data['average_durations'] = dailyAverages
        self.duration_data['total_duration'] = self.total_duration
        self.duration_data['total_build_count'] = self.total_build_count
        return {'durations': self.duration_data}

    def getFailureRate(self):
        ''' returns for a job, the number of builds that failed / day '''
        current_job = self.server.get_job_info(str(self.job_name), 0, True)
        job_builds = current_job.get('builds')
        # loop builds for current job
        for build in job_builds:
            build_number = build.get('number')
            build_info = self.server.get_build_info(
                self.job_name, build_number)
            # get name, time, result
            dateTimeObj = datetime.fromtimestamp(
                build_info.get('timestamp')/1000)
            build_timestamp = dateTimeObj.strftime("%m/%d/%Y")
            build_result = build_info.get('result')
            # print(build_timestamp, build_result)
            # ADD TO FAIL RATES
            if build_timestamp not in self.fail_rates.keys():
                self.fail_rates[build_timestamp] = \
                    {'date': build_timestamp, 'fail_rate':None, 'total_fails':0, 'total_builds':0}
            if build_result == 'FAILURE':
                self.fail_rates[build_timestamp]['total_fails'] += 1
            self.fail_rates[build_timestamp]['total_builds'] += 1

        # Get failure rate / day
        for key, value in self.fail_rates.items():
            # print(key, value)
            value['fail_rate'] = value['total_fails'] / value['total_builds']

        # print('final fail_rates: ', self.fail_rates)
        return {'failure_rates': self.fail_rates}

    def dailyAverage(self, get_average, timestamps):
        ''' helper function - takes array of <some value> & timestamp, returns daily average'''
        # Given [duration : timestamp]
        # save starting timestamp, and keep a counter
        # if duration in same day as current timestamp(day), add to running total in dict for that timestamp(day)
        # if new timestamp (day), save new timestamp in dict and start running total
        # Now we're left with the total durations for each timestamp(day)
        daily_avgs = {}
        current_date = None
        for index in range(len(timestamps)):
            # print(index, len(timestamps))
            dateTimeObj = datetime.fromtimestamp((timestamps[index]/1000))
            t_date = dateTimeObj.strftime("%m/%d/%Y")
            # print('T_DATE: ', t_date)
            if not current_date:
                current_date = t_date
                daily_avgs[current_date] = {'date': current_date, 'total_sec':0, 'build_count':0, 'avg_duration':None}
            # print('Current date: ', current_date)
            if t_date == current_date:
                daily_avgs[current_date]['build_count'] += 1
                daily_avgs[current_date]['total_sec'] += get_average[index]
            else:  # once the date no longer matches the previous /current date
                # assign the average
                daily_avgs[current_date]['avg_duration'] = \
                    daily_avgs[current_date]['total_sec'] / daily_avgs[current_date]['build_count']
                current_date = t_date 
                daily_avgs[current_date] = \
                    {'date': current_date, 'total_sec':get_average[index], 'build_count':1, 'avg_duration':None}
                    
        daily_avgs[current_date]['avg_duration'] = \
                    daily_avgs[current_date]['total_sec'] / daily_avgs[current_date]['build_count']
            
        return daily_avgs


class BuildMetrics_Old:
    server = None

    # Jenkins jobs:
    allJobNames = []
    allJobSummaries = []

    # METRICS:
    buildFailures = 0  # move these from static to init
    buildSuccesses = 0
    buildCancels = 0

    allResults = []
    buildDurations = []  # y axis for durations
    buildTimestamps = []  # x axis for date
    totalNumberBuilds = 0
    totalDuration = 0.0

    def __init__(self, jenkinsConnection):
        self.server = jenkinsConnection

    def getJobNames(self):
        # return names of all jobs
        jenkinsJobs = self.server.get_all_jobs()

        if len(self.allJobNames) <= 0:
            for job in jenkinsJobs:
                self.allJobNames.append(str(job['name']))

        return self.allJobNames

    def getStatusCounts(self):
        # print('------------ Build Stats ---------------')
        # print('Total Failures: ', self.buildFailures)
        # print('Total Successes: ', self.buildSuccesses)
        # print('Total Cancels: ', self.buildCancels)
        # print('All Results: ', self.allResults)

        # print("Average Build Duration %.2f " % averageDuration)
        return [self.buildFailures, self.buildSuccesses, self.buildCancels]

    def getDurationTimeStatus(self):
        ''' Gives us the status of each build how long it took and when it was run '''
        averageDuration = (self.totalDuration / self.totalNumberBuilds)
        return [averageDuration, self.buildTimestamps, self.buildDurations, self.allResults]

    def populateStats(self, currentJob):
        # JOB INFO

        # jenkinsJobs = self.server.get_all_jobs()

        my_job = self.server.get_job_info(str(currentJob), 0, True)
        # for key,value in my_job.items():
        #     print(key," -> ", value)

        # BUILD INFO
        myJobBuilds = my_job.get('builds')
        for build in myJobBuilds:
            buildNumber = build.get('number')
            buildInfo = self.server.get_build_info(
                'sleeper_simulation-1', buildNumber)
            # UNCOMMENT TO SEE FULL BUILD INFO
            # for key,value in buildInfo.items():
            #     print(key, ' -> ', value)
            buildName = buildInfo.get('fullDisplayName')
            buildResult = buildInfo.get('result')
            self.allResults.append([buildName, buildResult])
            if buildResult == "FAILURE":
                self.buildFailures += 1
            elif buildResult == "SUCCESS":
                self.buildSuccesses += 1
            else:  # CANCELLED ?????
                self.buildCancels += 1

            buildTimestamp = buildInfo.get('timestamp')
            buildDuration = (buildInfo.get('duration')) / \
                1000  # convert to seconds
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

# Extra code for debugging
#
# import sys
# import getopt
# import matplotlib.pyplot as plt
# import matplotlib
# import time
# import numpy as np
#     def plotJobDuration(self):
#         dateTimeObjs = self.convertTimestamps()
#         dates = matplotlib.dates.date2num(dateTimeObjs)
#         # npArr = self.runningMean()
#         plt.plot_date(dates, self.buildDurations, '-')
#         plt.xlabel('Time of Execution')
#         plt.ylabel('Build Duration (Seconds)')
#         plt.title('Build Durations Over Time')
#         plt.gcf().autofmt_xdate()
#         plt.show()
#
#     def runningMean(self):
#         ''' Helps us identify trends in the data by convolving
#         Sacrificing exact time of the jobs -> to see trends
#         '''
#         npArr = np.convolve(self.buildDurations,
#                             np.ones((10,))/10, mode='valid')
#         return npArr
