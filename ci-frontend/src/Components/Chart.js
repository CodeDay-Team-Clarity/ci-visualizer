<<<<<<< HEAD:ci-frontend/src/Component/Chart.js
import useFetch from "./useFetch";

import { Bar } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import { height } from "@material-ui/system";
=======
import { Bar } from 'react-chartjs-2';
>>>>>>> 7d29070e3d41747232d6bea0975f0d45a681ad05:ci-frontend/src/Components/Chart.js

const Chart = ({stats, error}) => {
  console.log(stats);

  const data = {
    labels: ["Successes", "Failures", "Unstable"],
    datasets: [
      {
        label: ["Number of jobs"],
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
      y: {
        beginAtZero: true,
        type: "linear",
        ticks: {
          stepSize: 1,
          title: {
            display: true,
            text: "Custom Chart Title",
          },
        },
      },
    },
  };

  return (
    <div className="container-fluid">
      <div class="row justify-content-start">
        {/* <Bar data={data} options={options} width={"1000%"} height={"50%"} /> */}
        <div class="row align-items-start">
          {/* <Card style={{ width: "15pc" }}>
            <Card.Body>
              <Card.Title>jobs data</Card.Title>
              <Card.Text>
                <h5>Number of Successes: {stats.Successes}</h5>
                <h5>Number of Failures: {stats.Failures}</h5>
                <h5>Number of Cancels: {stats.Cancels}</h5>
                <h5>Average build time: {stats.Average}</h5>
              </Card.Text>
            </Card.Body>
          </Card>
          {""}
          <Card style={{ width: "15pc" }}>
            <Card.Body>
              <Card.Title>jobs data</Card.Title>
              <Card.Text>
                <h5>Number of Successes: {stats.Successes}</h5>
                <h5>Number of Failures: {stats.Failures}</h5>
                <h5>Number of Cancels: {stats.Cancels}</h5>
                <h5>Average build time: {stats.Average}</h5>
              </Card.Text>
            </Card.Body>
          </Card> */}
        </div>
        <div class="col align-self-end">
          <h2 className="chartTitle">Build Status</h2>
          <Bar data={data} options={options} width={450} height={150} />
        </div>
      </div>
    </div>
  );
};

export default Chart;