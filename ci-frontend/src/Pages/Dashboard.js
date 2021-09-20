import useFetch from '../Components/useFetch';
import { Switch, Route } from 'react-router-dom';
import { TopNav, OffCanvas } from '../Components/Navigation';
import Chart from '../Components/Chart';
import JobStatsCard from '../Components/Charts/JobStatsCard';

const Dashboard = () => {
    const { data: stats, error } = useFetch(
        "/stats?job=sleeper_simulation-1&username=jenkins&password=codeday&url=http://builds.ci-visualizer.com:8080/"
      );

    console.log(stats);

    const creds = JSON.parse(localStorage.getItem('credentials'));

    console.log(creds.username);

    return (
        <div>
            <div>
                <TopNav/>
                <OffCanvas/>
            </div>
            <div className = "main-content">
                <Switch>
                    <Route path = "/dashboard/chart">
                        <Chart stats = {stats} error = {error}/>
                    </Route>
                    <Route path = "/" render = {() => <div>Hello</div>}/>
                    <Route path = "/:jobname">
                        <JobStatsCard stats = {stats}/>
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default Dashboard;