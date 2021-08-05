import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

// import Login from './Component/Login';
import Dashboard from './Component/Dashboard';
import Preferences from './Component/Preferences';
import Test from './Component/Test';
import Fetch from './Component/Fetch';
import SideNav from './Component/SideNav';


function App() {
  // const [token, setToken] = useState();

  // if (!token) {
  //   return <Login setToken = {setToken} />
  // }

<<<<<<< HEAD
 // useEffect(() => {
  //   // for your instances, replace username, password, and url to match your setup
    // fetch('/stats?username=jenkins&password=codeday&url=http://builds.ci-visualizer.com:8080/').then(
    //   response => response.json()
   // ).then(data => setInitialData(data))
   //}, []);


=======
>>>>>>> f60b748aca52b085978b91001c3e061cf55ddada
  useEffect(() => {
    const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'jenkins', password: 'codeday', url: 'http://builds.ci-visualizer.com:8080' })
};
    fetch('/login', requestOptions).then(
      response => {
        if (response.status === 200){
          return response.json()
        } else {
          return {"message":"connection failed"}
        }
      }
    ).then(data => console.log(data))
  }, []);

  return (
<<<<<<< HEAD
 <div className = "wrapper">
      
=======
    <div className = "wrapper">
      <h1>Application</h1>
>>>>>>> f60b748aca52b085978b91001c3e061cf55ddada
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
          <Route path="/Fetch">
            <Fetch />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;