// import React, { useState, useEffect } from 'react';
// import { logout } from './helpers';
import useFetch from './useFetch';

import { Bar } from 'react-chartjs-2';
// import Fetch from './Fetch';


const Chart = () => {

    const { data: stats, error } = useFetch('/stats?username=jenkins&password=codeday&url=http://builds.ci-visualizer.com:8080/')

    const data = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
            {
                label: '# of Votes',
                data: [stats.Successes, stats.Failures, stats.Cancels],

                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
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
            { error && <div>{ error }</div>}
            { stats && (
                <div>
                    <h2>Number of Successes: {stats.Successes}</h2>
                    <h2>Number of Failures: {stats.Failures}</h2>
                    <h2>Number of Cancels: {stats.Cancels}</h2>
                    <h2>Average build time: {stats.Average}</h2>
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
