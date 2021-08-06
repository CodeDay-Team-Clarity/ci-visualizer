import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

// import Login from './Component/Login';
import Dashboard from './Component/Dashboard';
import Preferences from './Component/Preferences';
import Test from './Component/Test';
import Fetch from './Component/Fetch';
import SideNav from './Component/SideNav';
import Chart from './Component/Chart';


function App() {
  // const [token, setToken] = useState();

  // if (!token) {
  //   return <Login setToken = {setToken} />
  // }

//   useEffect(() => {
//     const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ username: 'jenkins', password: 'codeday', url: 'http://builds.ci-visualizer.com:8080' })
// };
//     fetch('/login', requestOptions).then(
//       response => {
//         if (response.status === 200){
//           return response.json()
//         } else {
//           return {"message":"connection failed"}
//         }
//       }
//     ).then(data => console.log(data))
//   }, []);

  return (
    <div className = "wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/stats">
            <Dashboard />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
          <Route path="/Test">
            <Test />
          </Route>
          <Route path="/SideNav">
            <SideNav />
          </Route>
          <Route path="/DashBoard">
            <Dashboard />
          </Route>
          <Route path="/Fetch">
            <Fetch/>
          </Route>
          
          <Route path="/Chart">
            <Chart/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;