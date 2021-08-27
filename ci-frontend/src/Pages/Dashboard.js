import React from "react";
import Chart from "../Component/Chart";
import TopNav from "../Component/TopNav";
import OffCanvas from "../Component/OffCanvas";

const Dashboard = () => {
  return (
    <div>
      <div>
        <TopNav />
        <OffCanvas />
      </div>
      <div className="main-content">
        <Chart />
      </div>
      <div className="col">
        <Chart />
      </div>
      {/* <h2>Dashboard</h2> */},
      <div className="row">
        <div
        //  className = "col-auto col-md-9 col-lg-10 col-xl-11"
        >
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
