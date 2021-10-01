import useFetch from "../Components/useFetch";
import { Switch, Route } from "react-router-dom";
import { TopNav, OffCanvas } from "../Components/Navigation";
import JobsTable from "../Components/ChartsAndTables/JobsTable";
import Chart from "../Components/ChartsAndTables/Chart";
// import LineChart from "../Components/Durartion";
import { backendUrl } from "../Components/backendRoute";
import Card from "../Components/Card";
// import Duration from "../Components/ChartsAndTables/Duration";

const Dashboard = () => {
  const { data: jobStats, error } = useFetch(
    backendUrl("/jobs?username=jenkins&password=codeday&url=http://builds.ci-visualizer.com:8080/")
  );

  const allJobs = Object.entries(jobStats).map(entry => {
    // const job = {};
    const job = {'id': entry[0], ...entry[1]}

    return job;
  });

  // console.log(allJobs);
  // const { data: stats, error } = useFetch(
  //   backendUrl(
  //     "/stats?job=sleeper_simulation-2&username=jenkins&password=codeday&url=http://builds.ci-visualizer.com:8080/"
  //   )
  // );

  // console.log(stats.durations['average durations']);
  
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
          <Route exact path = "/">
            <Card
              {...{ component: <JobsTable allJobs = {allJobs}/>, size: 12, title: "Jobs List" }}
            />
          </Route>
          <Route path = "/jobs/:job">
            <Card {...{ component: <Chart/>, size: 6, title: "Job Stats" }}/>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
