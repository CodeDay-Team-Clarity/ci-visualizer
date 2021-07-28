import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

// import Login from './Component/Login';
import Dashboard from './Component/Dashboard';
import Preferences from './Component/Preferences';


function App() {
  // const [token, setToken] = useState();
  const [initialData, setInitialData] = useState([{}])

  // if (!token) {
  //   return <Login setToken = {setToken} />
  // }


  useEffect(() => {
    // for your instances, replace username, password, and url to match your setup
    fetch('/stats?username=admin&password=password&url=http://localhost:8080/').then(
      response => response.json()
    ).then(data => setInitialData(data))
  }, []);

  return (
    <div className = "wrapper">
      <h1>Application</h1>
      <h2>Number of Successes: {initialData.Successes}</h2>
      <h2>Number of Failures: {initialData.Failures}</h2>
      <h2>Number of Cancels: {initialData.Cancels}</h2>
      <h2>Average build time: {initialData.Average}</h2>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;