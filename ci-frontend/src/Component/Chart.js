// import React, { useState, useEffect } from 'react';
// import { logout } from './helpers';
import useFetch from './useFetch';

import { Bar } from 'react-chartjs-2';
// import Fetch from './Fetch';


const Chart = () => {

    const { data: info, error } = useFetch('/stats?username=jenkins&password=codeday&url=http://builds.ci-visualizer.com:8080/')

    const data = {
        labels: ['Green', 'Red','Yellow','Gray'],
        datasets: [
            {
                label: '# of jobs',
                data: [info.Successes, info.Failures, info.Cancels],

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
            { error && <div>{ error }</div>}
            { info && (
                <div>
                    <Bar data={data} options={options} />
                    <h2>Number of Successes: {info.Successes}</h2>
                    <h2>Number of Failures: {info.Failures}</h2>
                    <h2>Number of Cancels: {info.Cancels}</h2>
                    <h2>Average build time: {info.Average}</h2>
                </div>
            )}
            {/* <button 
                onClick = {logout}
                >
                Logout
            </button> */}
        </div>
    );
}

export default Chart;
