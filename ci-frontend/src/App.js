import React, { Redirect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import SideNav from "./Component/SideNav";
//import SideNavData from "./Pages/SideNavData.css";

function App() {
  const loggedIn = localStorage.getItem("logged");
  return (
    <div className="container-fluid p-0">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/dashboard" /> : <Login />}
          </Route>
          <Route path="/stats">
            <Dashboard />
          </Route>
          <Route path="/SideNav">
            <SideNav />
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
