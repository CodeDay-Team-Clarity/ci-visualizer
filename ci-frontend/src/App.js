import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import Login from './Component/Login';
import Dashboard from './Component/Dashboard';
import Preferences from './Component/Preferences';


function App() {
  return (
    <div className = "wrapper">
      <h1>Application</h1>
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
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;