import React from "react";

import Logout from "./logout";
import Chart from "./Chart";
import TopNav from "./TopNav";
// import SideNav from './SideNav';

function Dashboard() {
  return (
    <div>
      <TopNav />
      <Logout />
      <h2>Dashboard</h2>
      <Chart />
    </div>
  );
}

export default Dashboard;
