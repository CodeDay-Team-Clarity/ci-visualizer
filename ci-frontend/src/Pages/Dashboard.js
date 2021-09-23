import useFetch from "../Components/useFetch";
import { Switch, Route } from "react-router-dom";
import { TopNav, OffCanvas } from "../Components/Navigation";
import Chart from "../Components/ChartsAndTables/Chart";
import Duration from "../Components/ChartsAndTables/Duration";
import JobsTable from "../Components/ChartsAndTables/JobsTable";

const Dashboard = () => {
  const { data: stats, error } = useFetch(
    "/stats?username=jenkins&password=codeday&url=http://builds.ci-visualizer.com:8080/"
  );

  return (
    <div>
      <div>
        <TopNav />
        <OffCanvas />
      </div>
      <div className="main-content">
        <Switch>
          <Route path="/dashboard/chart">
            <Chart stats={stats} error={error} />
            <Duration stats={stats} />
          </Route>
          <Route path="/">
            <JobsTable />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
