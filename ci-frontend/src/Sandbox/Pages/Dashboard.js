import { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import { ApiContext } from '../Contexts/ApiContext'

import { TopNav, OffCanvas } from "../Components/Navigation";
import { Chart, JobsTable } from "../Components/ChartsAndTables";
import Card from '../Components/Card';

const Dashboard = () => {
  const { allJobs } = useContext(ApiContext);

  return (
    <div>
      <div>
        <TopNav />
        <OffCanvas />
      </div>
      <div className="main-content">
        <Switch>
          <Route exact path = '/'>
            <Card {...{ component: <JobsTable allJobs = {allJobs}/>, size: 12, title: "Jobs List" }}/>
          </Route>
          <Route path = '/jobs/:job'>
            <Card {...{ component: <Chart />, size: 6, title: "Job Stats" }}/>
          </Route>
          <Route></Route>
          <Route></Route>
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
