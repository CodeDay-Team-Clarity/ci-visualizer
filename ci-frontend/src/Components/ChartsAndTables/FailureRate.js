import { useContext } from "react";
import { Context } from '../../Store/appContext';
import { Line } from "react-chartjs-2";


const FailureRate = props => {
  const { store, actions } = useContext(Context);

  // function dateString(timeStamp){
  //   var d = new Date(timeStamp);
  //   return (
  //     d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
  //     d.getHours() + ":" + d.getMinutes())
  // }

  //console.log(dateString(new Date(1628290262920)))   //returns '6-8-2021 15:51'

  const dates = Object.entries(store.jobStats.failure_rates).map(entry => {
    const date = entry[0];
    return date;
  });
  console.log(dates);

  const failRates = Object.entries(store.jobStats.failure_rates).map(entry => {
    const rate = entry[1].fail_rate;
    return rate;
  });
  console.log(failRates);

  // const labels = timeStamp.map(entry => {
  //   const job = actions.dateString(entry[1].timestamp);
  //   console.log(job);
  //   return job;
  // })
  // const durData = Object.entries(store.jobStats.durations.all_data).map(entry => {
  //   const job = entry[1].duration / 1000;
  //   return job;
  // })

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