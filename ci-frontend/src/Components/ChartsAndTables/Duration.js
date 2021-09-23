import React from "react";
import { Line } from "react-chartjs-2";

// const [datas, setData] = [];
// const [state, setstate] = useState(initialState);

export default function Duration(stats) {
  const data = {
    labels: [stats.BuildTimestamps],
    // labels: ["1", "2", "3", "4", "5", "6"], // delet after backend works
    datasets: [
      {
        label: "Duration",
        data: [stats.BuildDurations],
        // data: [12, 19, 3, 5, 2, 3],  // delet after backend works
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

  return (
    <div>
      <>
        <Line data={data} options={options} />
      </>
      `
    </div>
  );
}