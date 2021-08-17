import React from 'react'

import Logout from '../Component/logout';
import Chart from '../Component/Chart';
// import SideNav from './SideNav';

import Logout from "./logout";
import Chart from "./Chart";
import TopNav from "./TopNav";
import t from "../Image/t.jpg";
import { SideNavData } from "./SideNavData";
import SideNav from "./SideNav";
// import DashBoard from "./DashBoard.css";

// import SideNav from './SideNav';

function Dashboard() {
  return (
    <div className="continar">
      <div>
        <TopNav />
      </div>

      <div className="">
        <SideNav />
      </div>
      <div>
        <Logout />
      </div>

      <h2>Dashboard</h2>
      <Chart />
      <div></div>
    </div>
  );
}

export default Dashboard;
