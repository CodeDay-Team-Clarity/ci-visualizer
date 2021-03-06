import { useContext } from "react";
import { Context } from '../../Store/appContext';
import { Line } from "react-chartjs-2";


const Duration = props => {
  const { store, actions } = useContext(Context);

  //console.log(actions.dateString(new Date(1628290262920)))   //returns '6-8-2021 15:51'

  const labels = Object.entries(store.jobStats.durations.all_data).map(entry => {
    const job = entry[0];
    return job;
  });
  const durData = Object.entries(store.jobStats.durations.all_data).map(entry => {
    const job = entry[1].duration / 1000;
    return job;
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Build time in Seconds",
        data: durData,
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
    </div>
  );
}

export default Duration;