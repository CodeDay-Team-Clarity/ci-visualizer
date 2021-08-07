import React from 'react'

import Logout from './logout';
import Chart from './Chart';


function Dashboard() {
    return (
        <div>
            <Logout />
            <h2>Dashboard</h2>
            <Chart />
        </div>
    )
}

export default Dashboard
