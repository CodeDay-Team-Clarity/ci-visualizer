import React,{useState,useEffect} from 'react';

import { Bar } from 'react-chartjs-2';
// import Fetch from './Fetch';



const Chart = () => {

    const[initialData,setInitialData]= useState([{}]);
    useEffect(() => {
        //   // for your instances, replace username, password, and url to match your setup
           fetch('/stats?username=jenkins&password=codeday&url=http://builds.ci-visualizer.com:8080/').then(
             response => response.json()
          ).then(data => setInitialData(data))
         }, []);

    const data = {
        labels: ['Green', 'Red','Yellow','Gray'],
        datasets: [
            {
                label: '# of Jobs',
                data: [initialData.Successes],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
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
            <Bar data={data} options={options} />
        </div>
    );
}

export default Chart;
