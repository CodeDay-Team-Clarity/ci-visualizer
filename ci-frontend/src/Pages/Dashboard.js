import useFetch from "../Components/useFetch";
import { Switch, Route } from "react-router-dom";
import { TopNav, OffCanvas } from "../Components/Navigation";
import Chart from "../Components/Chart";
import Durartion from "../Components/Durartion";

const Dashboard = () => {
  const { data: stats, error } = useFetch(
    "/stats?job=sleeper_simulation-1&username=jenkins&password=codeday&url=http://builds.ci-visualizer.com:8080/"
  );
  console.log(stats);
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
            <Durartion stats={stats} />
          </Route>
          <Route path="/dashboard" render={() => <div>Hello</div>} />
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
