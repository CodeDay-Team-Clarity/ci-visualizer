// import React, { useState, useEffect } from 'react';
// import { logout } from './helpers';
import useFetch from './useFetch';

import { Bar } from 'react-chartjs-2';
// import Fetch from './Fetch';
import './SideData.css'


const Chart = () => {

    const { data: info, error } = useFetch('/stats?username=jenkins&password=codeday&url=http://builds.ci-visualizer.com:8080/')

    const data = {
        labels: ['Successes', 'Failures', 'Unstable'],
        datasets: [
            {
                label: ['# of jobs'],
                data: [info.Successes, info.Failures, info.Cancels],

               backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                    
                ],
                
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
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
            { error && <div>{ error }</div>}
            { info && (
                <div>
                    
                    <h2>Number of Successes: {info.Successes}</h2>
                    <h2>Number of Failures: {info.Failures}</h2>
                    <h2>Number of Cancels: {info.Cancels}</h2>
                    <h2>Average build time: {info.Average}</h2>
               
                    <h2 className='chartTitle'>Build Status</h2>
                    
                    <Bar data={data} options={options} />
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
