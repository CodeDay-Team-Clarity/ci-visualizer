import React from 'react'

import Chart from './Chart';
// import SideNav from './SideNav';


function Dashboard() {
    return (
        <div >
           
          <div>
           
            <Chart Successes = {5} Unstable={2} Failures={3} Cancels ={0}/>
                
                  </div>
            {/* <SideNav/> */}
           
        </div>
    )
}

export default Dashboard
