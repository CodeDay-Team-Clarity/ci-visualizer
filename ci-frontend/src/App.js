import { BrowserRouter as Router, Route } from "react-router-dom";
import { Login, Dashboard } from "./Pages";

const App = () => {
  const loggedIn = localStorage.getItem("loggedIn");

  if (!loggedIn) {
    return <Login />;
  }

  return (
    <div>
      <Router>
          <Route path = "/">
            <Dashboard />
          </Route>
      </Router>
    </div>
  );
};

export default App;
