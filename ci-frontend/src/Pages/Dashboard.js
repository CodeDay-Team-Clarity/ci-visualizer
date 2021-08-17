import React from "react";

import Logout from '../Component/logout';
import Chart from '../Component/Chart';
// import SideNav from '../Component/SideNav';
// import SideNav from '../Component/TopNav';

// import SideNav from './SideNav';

function Dashboard() {
    return (
        <div >
            <Logout />
            <h2>Dashboard</h2>
            <Chart/>
        </div>
    )
}

export default Dashboard
