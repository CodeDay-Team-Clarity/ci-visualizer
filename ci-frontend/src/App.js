import React, { Redirect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './Styles/App.css';

import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
// import Preferences from './Component/Preferences';
// import Test from './Component/Test';
// import Fetch from './Component/Fetch';
// import SideNav from './Component/SideNav';


function App() {
  const loggedIn = localStorage.getItem('logged');
  return (
    <div className = "wrapper">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/dashboard" /> : <Login />}
          </Route>
          {/* <Route path="/dashboard">
            {loggedIn ? <Dashboard /> : <Login />}
          </Route> */}
          <Route path="/stats">
            <Dashboard />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/Dashboard">
            <Dashboard />
          </Route>
          {/* <Route path="/preferences">
            <Preferences />
          </Route> */}
          {/* <Route path="/Test">
            <Test />
          </Route>
          <Route path="/SideNav">
            <SideNav />
          </Route>
          <Route path="/DashBoard">
            <Dashboard />
          </Route>
          <Route path="/Fetch">
            <Fetch />
          </Route> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;