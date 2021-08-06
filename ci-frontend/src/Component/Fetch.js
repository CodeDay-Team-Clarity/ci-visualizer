import React, { useState } from 'react';
import { useEffect } from 'react';
import Chart from './Chart';
import Test from './Test';

export default function Fetch() {
    const [initialData, setInitialData]= useState([{}]);

    useEffect(() => {
        //   // for your instances, replace username, password, and url to match your setup
           fetch('/stats?username=jenkins&password=codeday&url=http://builds.ci-visualizer.com:8080/').then(
             response => response.json()
          ).then(data => setInitialData(data))
         }, []);
        
         
         
    return (
        <div>
             {/* <h1>Application</h1>
          
      <h2>Number of Successes: {initialData.Successes}</h2>
      <h2>Number of Failures: {initialData.Failures}</h2>
      <h2>Number of Cancels: {initialData.Cancels}</h2>
      <h2>Average build time: {initialData.Average}</h2>
         <Chart Successes={initialData.Average}/> */}
      
        </div>
    )
}
