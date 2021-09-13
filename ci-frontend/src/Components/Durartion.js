import React from "react";
import { Line } from "react-chartjs-2";

// const [datas, setData] = [];
// const [state, setstate] = useState(initialState);

const data = {
  labels: ["1", "2", "3", "4", "5", "6"],
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

const LineChart = () => (
  <>
    <div className="Duration">
      <h1 className="title">Line Chart</h1>
    </div>
    <Line data={data} options={options} />
  </>
);

export default LineChart;
