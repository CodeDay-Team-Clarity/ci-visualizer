import { Login, Dashboard } from "./Pages";
import injectContext from "./Store/appContext";

// import { Login, Dashboard } from "./Sandbox/Pages";
// import ApiContextProvider from "./Sandbox/Contexts/ApiContext";

const App = () => {
  const loggedIn = JSON.parse(localStorage.getItem('loggedIn'));

  // const loggedIn = localStorage.getItem('userLoggedIn');

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
// export default App;