
import React, { useState } from 'react';

import { Bar } from 'react-chartjs-2';
import { useEffect } from 'react';
//import axios from 'axios';
//import { parse } from 'yargs';



export default function Test() {
    const [dataChart , setdataChart]= useState({});
   
     // const [token, setToken] = useState();
  const [initialData, setInitialData] = useState([{}])

  // if (!token) {
  //   return <Login setToken = {setToken} />
  // }

  
    const data =() =>{
      
        
        setdataChart({
        labels: ['Successes', 'unstable', 'Failures'],
        datasets: [
            {
                label: '# of Jobs',
                data: [4,5,6],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }) 
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

    useEffect(() => {
        data()
    },[])
    
    return (
        <div>
            <Bar data={dataChart} options={options} />
        </div>
    );
}
