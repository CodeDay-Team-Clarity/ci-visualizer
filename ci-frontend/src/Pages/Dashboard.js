import React from "react";
import Chart from '../Components/Chart';
import TopNav from '../Components/TopNav';
import OffCanvas from "../Components/OffCanvas";

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