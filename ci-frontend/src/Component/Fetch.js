import React, { useState } from 'react';
import { useEffect } from 'react';
import Chart from './Chart';

export default function Fetch() {
    const [initialData, setInitialData]= useState([{}]);

    useEffect(() => {
        //   // for your instances, replace username, password, and url to match your setup
           fetch('/stats?username=jenkins&password=codeday&url=http://builds.ci-visualizer.com:8080/').then(
             response => response.json()
          ).then(data => setInitialData(data))
         }, []);
         console.log(initialData.Successes,initialData.Failures,initialData.Cancels);
         
         
    return (
        <div>
             <h1>Application</h1>
          
      <h2>Number of Successes: {initialData.Successes}</h2>
      <h2>Number of Failures: {initialData.Failures}</h2>
      <h2>Number of Cancels: {initialData.Cancels}</h2>
      <h2>Average build time: {initialData.Average}</h2>

      <Chart Successes = {initialData.Successes} Average={initialData.Average} Cancels={initialData.Cancels}/>
        </div>
    )
}
