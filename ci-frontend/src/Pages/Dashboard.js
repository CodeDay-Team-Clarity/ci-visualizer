import useFetch from "../Components/useFetch";
import { Switch, Route } from "react-router-dom";
import { TopNav, OffCanvas } from "../Components/Navigation";
import Chart from "../Components/Chart";
import LineChart from "../Components/Durartion";

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
            <LineChart stats={stats} error={error} />
          </Route>
          <Route path="/dashboard" render={() => <div>Hello</div>} />
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
