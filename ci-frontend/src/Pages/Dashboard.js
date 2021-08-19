import React from "react";

import Logout from '../Component/logout';
import Chart from '../Component/Chart';
// import SideNav from '../Component/SideNav';
import TopNav from '../Component/TopNav';
import SideNav from '../Component/sideNavTest';

// import SideNav from './SideNav';

function Dashboard() {
    return (
        <div className = "container-fluid row">
                <SideNav />
                <div className = "col-auto col-md-9 col-lg-10 col-xl-11">
                    <div className = "row">
                        <TopNav />
                      
                        {/* <h2>Dashboard</h2> */}
                    </div>
                    <div className = "row">
                        <div
                        //  className = "col-auto col-md-9 col-lg-10 col-xl-11"
                         >
                        <Logout />
                        <Chart/>
                        </div>
                    </div>
                </div>

        </div>
    )
}

export default Dashboard;