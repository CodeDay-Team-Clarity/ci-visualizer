import React from 'react'

import Chart from './Chart';

function Dashboard() {
    return (
        <div>
            <h2>Dashboard</h2>
            <Chart Successes = {5} Unstable={2} Failures={3} Cancels ={0}/>
        </div>
    )
}

export default Dashboard
