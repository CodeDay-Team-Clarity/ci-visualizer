import { useContext } from "react";
import { Context } from '../../Store/appContext';
import { Line } from "react-chartjs-2";


const FailureRate = props => {
  const { store, actions } = useContext(Context);

  //console.log(actions.dateString(new Date(1628290262920)))   //returns '6-8-2021 15:51'

  const dates = Object.entries(store.jobStats.failure_rates).map(entry => {
    const date = entry[0];
    return date;
  });

  const failRates = Object.entries(store.jobStats.failure_rates).map(entry => {
    const rate = entry[1].fail_rate;
    return rate;
  });

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Builds/Failures",
        data: failRates,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
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

export default FailureRate;