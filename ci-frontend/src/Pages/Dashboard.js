import { useState, useEffect, useContext } from 'react';
import { Context } from '../Store/appContext';

import { Switch, Route, useParams } from "react-router-dom";
import { TopNav, OffCanvas } from "../Components/Navigation";

import JobsTable from "../Components/ChartsAndTables/JobsTable";
import Chart from "../Components/ChartsAndTables/Chart";

import Card from "../Components/Card";
// import Duration from "../Components/ChartsAndTables/Duration";
// import LineChart from "../Components/Durartion";

const Dashboard = () => {
  const { store, actions } = useContext(Context);

  const allJobs = Object.entries(store.allJobsStats).map(entry => {
    const job = {'id': entry[0], ...entry[1]}

    return job;
  });
  
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
            {/* <Card {...{"component": <JobsDuration />, "size": 6, "title": "Build Status"}}/> */}
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
