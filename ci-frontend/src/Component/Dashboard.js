import React from 'react'

import Chart from './Chart';
// import SideNav from './SideNav';


function Dashboard() {
    return (
        <div >
            <h2>Dashboard</h2>
          <div>
            {/* <div style = {{height:"400px" , width:"1000px"}}>    */}
            <Chart Successes = {5} Unstable={2} Failures={3} Cancels ={0}/>
                
                  </div>
            {/* <SideNav/> */}
           
        </div>
    )
}

export default Dashboard
