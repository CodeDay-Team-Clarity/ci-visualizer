import { useState, useEffect, useContext } from 'react';
import { Context } from '../Store/appContext';

// import useFetch from "../Components/useFetch";
import { Switch, Route, useParams } from "react-router-dom";
import { TopNav, OffCanvas } from "../Components/Navigation";
import JobsTable from "../Components/ChartsAndTables/JobsTable";
import Chart from "../Components/ChartsAndTables/Chart";
// import LineChart from "../Components/Durartion";
// import { backendUrl } from "../Components/backendRoute";
import Card from "../Components/Card";
// import Duration from "../Components/ChartsAndTables/Duration";

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
          {/* <Route path="/dashboard/chart"> */}
            {/* <Card {...{"component": <Chart stats={stats} error={error}/>, "size": 6, "title": "Build Status"}}/> */}
            {/* <Card {...{"component": <JobsDuration stats={stats} error={error}/>, "size": 6, "title": "Build Status"}}/> */}
            {/* <Duration stats={stats} /> */}
          {/* </Route> */}
          <Route path = "/jobs/:job">
            <Card {...{ component: <Chart />, size: 6, title: "Job Stats" }}/>
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
