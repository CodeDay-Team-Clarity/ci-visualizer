import { useState, useEffect, useContext } from 'react';
import { Context } from '../Store/appContext';

import { Switch, Route, useParams } from "react-router-dom";
import { TopNav, OffCanvas } from "../Components/Navigation";

import JobsTable from "../Components/ChartsAndTables/JobsTable";
import Chart from "../Components/ChartsAndTables/Chart";

import Card from "../Components/Card";
import Duration from "../Components/ChartsAndTables/Duration";
// import LineChart from "../Components/Durartion";

const Dashboard = () => {
  const { store, actions } = useContext(Context);
  
  const loading = JSON.parse(localStorage.getItem('loading'));
  const jobsLength = Object.keys(store.allJobsStats).length;

  const allJobs = Object.entries(store.allJobsStats).map(entry => {
    const job = {'id': entry[0], ...entry[1]}

    return job;
  });
  // useEffect(() => {
  //   console.log('useEffect ran on dashboard');
  //   jobsLength === 0 ? (loading ? console.log('first') : console.log('second')) : console.log('third');
  // });

  useEffect(() => {
    console.log('useEffect ran on dashboard');
    // loggedIn ? actions.setUser() : console.log('No user loggedIn');
    if(jobsLength === 0 && loading === false) {
      actions.setUser();
      actions.getAllJobsStats();
    };
  }, []);

  // const jobs = Object.entries(store.jobStats).map(entry => {
  //   const job = {'id': entry[2]}
  // });

  // console.log(Object.entries(store.jobStats.durations.all_data).map(entry => {
  //   const job = {'id': entry[0], ...entry[1]};
  //   return job;
  // }));
  
  return (
    <div>
      <div>
        <TopNav />
        <OffCanvas />
      </div>
      <div className="main-content">
        <Switch>
          <Route path = "/jobs/:job">
            <Card {...{ component: <Chart />, size: 6, title: "Job Stats" }}/>
            <Card {...{ component: <Duration />, size: 6, title: "Build Status"}}/>
            {/* <Duration /> */}
          </Route>
          <Route path = "/">
            <Card
              {...{ component: <JobsTable allJobs = {allJobs}/>, size: 12, title: "Jobs List" }}
            />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
