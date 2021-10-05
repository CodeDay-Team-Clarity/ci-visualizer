import { Route } from "react-router-dom";
import { Login, Dashboard } from "./Pages";
import injectContext from "./Store/appContext";

const App = () => {
  const loggedIn = localStorage.getItem("loggedIn");

  if (!loggedIn) {
    return <Login />;
  }

  return (
    <div>
        <Route exact path = "/">
          <Dashboard />
        </Route>
     </div>
  );
};

export default injectContext(App);