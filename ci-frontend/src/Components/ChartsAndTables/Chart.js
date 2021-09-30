import { Bar } from "react-chartjs-2";

const Chart = ({ stats, error }) => {
  console.log(stats);

  const data = {
    labels: ["Successes", "Failures", "Unstable"],
    datasets: [
      {
        label: ["Number of jobs"],
        data: [
          stats.results.success,
          stats.results.failure,
          stats.results.cancel,
        ],

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
      <div className="row justify-content-start">
        <div className="col align-self-end">
          {/* <h2 className="chartTitle">Build Status</h2> */}
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Chart;
