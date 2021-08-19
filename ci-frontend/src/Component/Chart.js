import useFetch from "./useFetch";

import { Bar } from "react-chartjs-2";

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
        <div>
          {/* <h2>Number of Successes: {stats.Successes}</h2>
                <h2>Number of Failures: {stats.Failures}</h2>
                <h2>Number of Cancels: {stats.Cancels}</h2>
                <h2>Average build time: {stats.Average}</h2> */}

          <h2 className="chartTitle">Build Status</h2>

          <Bar data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default Chart;
