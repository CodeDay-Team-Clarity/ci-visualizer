import React, { Redirect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';

function App() {
  const loggedIn = localStorage.getItem("logged");
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/dashboard" /> : <Login />}
          </Route>
          <Route path="/stats">
            <Dashboard />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/Dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
