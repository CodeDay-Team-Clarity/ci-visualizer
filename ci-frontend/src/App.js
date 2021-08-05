import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import Login from './Component/Login';
import Dashboard from './Component/Dashboard';
import Preferences from './Component/Preferences';
import Test from './Component/Test';
import Fetch from './Component/Fetch';
import SideNav from './Component/SideNav';


function App() {
  return (
    <div className = "wrapper">
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          {/* <Route path="/stats">
            <Dashboard />
          </Route> */}
          <Route path="/preferences">
            <Preferences />
          </Route>
          <Route path="/Test">
            <Test />
          </Route>
          <Route path="/SideNav">
            <SideNav />
          </Route>
          <Route path="/Fetch">
            <Fetch />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;