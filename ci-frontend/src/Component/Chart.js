import useFetch from "./useFetch";

import { Bar } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import { height } from "@material-ui/system";

const Chart = () => {
  const { data: stats, error } = useFetch(
    "/stats?username=jenkins&password=codeday&url=http://builds.ci-visualizer.com:8080/"
  );

  const data = {
    labels: ["Successes", "Failures", "Unstable"],
    datasets: [
      {
        label: ["# of jobs"],
        data: [stats.Successes, stats.Failures, stats.Cancels],

        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],

        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      {error && <div>{error}</div>}
      {stats && (
        <div className="row">
          {/* <div className="col-auto col-md-4 col-lg-3 col-xl-2">
            <h2>Number of Successes: {stats.Successes}</h2>
            <h2>Number of Failures: {stats.Failures}</h2>
            <h2>Number of Cancels: {stats.Cancels}</h2>
            <h2>Average build time: {stats.Average}</h2>
          </div> */}
          <div className="col-auto col-md-8 col-lg-9 col-xl-10">
            <Card style={{ width: "15pc" }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>jobs data</Card.Title>
                <Card.Text>
                  <h4>Number of Successes: {stats.Successes}</h4>
                  <h4>Number of Failures: {stats.Failures}</h4>
                  <h4>Number of Cancels: {stats.Cancels}</h4>
                  <h4>Average build time: {stats.Average}</h4>
                </Card.Text>
              </Card.Body>
            </Card>

            <h2 className="chartTitle">Build Status</h2>
            <Bar data={data} options={options} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chart;
