import { useEffect } from "react";
import { Login, Dashboard } from "./Pages";
import injectContext from "./Store/appContext";

const App = () => {
  const loggedIn = localStorage.getItem('userLoggedIn');
  
  useEffect(() => {
    console.log("useEffect ran on app.js");
  }, [loggedIn])

  return (
    <>
      {/* <ApiContextProvider> */}
        {loggedIn ?
            <Dashboard/>
          :
            <Login/>
        }
      {/* </ApiContextProvider> */}
     </>
  );
};

export default injectContext(App);