import React, { useState, useEffect } from 'react';

import { Bar } from 'react-chartjs-2';
import Fetch from './Fetch';

<<<<<<< HEAD
const Chart = (props) => {
    const data = {
        labels: ['Green', 'Red','Yellow','Gray'],
        datasets: [
            {
                label: '# of Jobs',
                data: [props.Successes,props.Failures,props.Unstable,props.Cancels],
=======
const Chart = () => {
    const [initialData, setInitialData] = useState([{}])

    useEffect(() => {
        fetch('/stats?username=jenkins&password=codeday&url=http://builds.ci-visualizer.com:8080/').then(
        response => response.json()
        ).then(data => setInitialData(data))
    }, []);

    const data = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
            {
                label: '# of Votes',
                data: [initialData.Successes, initialData.Failures, initialData.Cancels],
>>>>>>> f60b748aca52b085978b91001c3e061cf55ddada
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
            <h2>Number of Successes: {initialData.Successes}</h2>
            <h2>Number of Failures: {initialData.Failures}</h2>
            <h2>Number of Cancels: {initialData.Cancels}</h2>
            <h2>Average build time: {initialData.Average}</h2>
        </div>
    );
}

export default Chart;
