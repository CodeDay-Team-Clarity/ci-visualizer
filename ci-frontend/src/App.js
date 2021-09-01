import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login, Dashboard } from './Pages';

const App = () => {
  const loggedIn = localStorage.getItem('loggedIn');

  if(!loggedIn) {
    return <Login/>
  }

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Dashboard/>
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path = "/">
            <Dashboard/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;