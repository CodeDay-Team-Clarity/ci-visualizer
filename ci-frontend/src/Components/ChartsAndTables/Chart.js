import { useContext } from 'react';
import { useLocation } from "react-router-dom";
import { Context } from '../../Store/appContext';
import { Bar } from "react-chartjs-2";

const Chart = props => {
  const { store } = useContext(Context);
  const location = useLocation();

  const data = {
    labels: ["Successes", "Failures", "Unstable"],
    datasets: [
      {
        label: ["Number of jobs"],
        data: [
          store.jobStats.results.success,
          store.jobStats.results.failure,
          store.jobStats.results.cancel,
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
      <h5 className="row justify-content-center">{ location.state.jobName }</h5>
      <div className="row justify-content-start">
        <div className="col align-self-end">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Chart;
