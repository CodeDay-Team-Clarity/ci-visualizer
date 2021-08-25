import React from "react";
import Chart from "../Component/Chart";
// import SideNav from '../Component/SideNav';
import TopNav from "../Component/TopNav";
import SideNav from "../Component/sideNavTest";

// import SideNav from './SideNav';

function Dashboard() {
  return (
    <div className="container-fluid p-0">
      <TopNav />
      <div className="row">
        <div className="col-3 col-lg-2 col-xl-2 col-xxl-1">
          <SideNav />

          {/* <h2>Dashboard</h2> */}
        </div>
        <div className="col">
          <Chart />
        </div>
      </div>

      {/* <h2>Dashboard</h2> */}

      <div className="row">
        <div
        //  className = "col-auto col-md-9 col-lg-10 col-xl-11"
        >
          <Logout />
          <Chart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
