import sys, getopt 
import jenkins 
import matplotlib.pyplot as plt 
import time 
import numpy as np
from datetime import datetime 

class DurationMetrics: 
    username = ''
    password = ''
    server = None

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

    durationMetrics = DurationMetrics(username, password)
    durationMetrics.connectToJenkins()

if __name__ == "__main__":
    main(sys.argv[1:])