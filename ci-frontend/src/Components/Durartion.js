import React from "react";
import { Line } from "react-chartjs-2";

// const [data, setData] = this;

const data = {
  labels: [stats.Successes],
  datasets: [
    {
      label: "Duration",
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(255, 99, 132, 0.2)",
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

const LineChart = (stats) => (
  <>
    <div className="Duration">
      <h1 className="title">Line Chart</h1>
    </div>
    <Line data={data} options={options} />
  </>
);

export default LineChart;
