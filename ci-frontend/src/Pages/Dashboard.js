import React from "react";
import Chart from '../Component/Chart';
import TopNav from '../Component/TopNav';
import OffCanvas from "../Component/OffCanvas";

const Dashboard = () => {
    return (
        <div>
            <div>
                <TopNav/>
                <OffCanvas/>
            </div>
            <div className = "main-content">
                <Chart/>
            </div>
        </div>
    )
}

export default Dashboard;