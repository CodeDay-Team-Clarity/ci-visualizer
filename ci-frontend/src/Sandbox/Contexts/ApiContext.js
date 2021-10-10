import { createContext, useState, useEffect } from 'react'

export const ApiContext = createContext();

const ApiContextProvider = (props) => {
    
    //state for login/user data
    const [ user, setUser ] = useState({
        username: '',
        password: '',
        url: ''
    });
    const [ loggedIn, setLoggedIn ] = useState(false);

    //state for job/build data

    const allJobsStats = {
        "sleeper_simulation-1": {
          "avg_duration": 47.0, 
          "results": {
            "cancel": 1, 
            "failure": 0, 
            "success": 4
          }
        }, 
        "sleeper_simulation-2": {
          "avg_duration": 2.0, 
          "results": {
            "cancel": 0, 
            "failure": 3, 
            "success": 0
          }
        }, 
        "sleeper_simulation-4": {
          "avg_duration": 0.5, 
          "results": {
            "cancel": 0, 
            "failure": 2, 
            "success": 0
          }
        }, 
        "sleeper_simulation-6": {
          "avg_duration": 49.166666666666664, 
          "results": {
            "cancel": 0, 
            "failure": 0, 
            "success": 6
          }
        }
      }

    const login = (username, password, jenkinsUrl) => {
        localStorage.setItem('userLoggedIn', true);
        setLoggedIn(true);
        setUser({username: username, password: password, url: jenkinsUrl});
        localStorage.setItem('user', JSON.stringify(user));
    }

    const logout = () => {
        localStorage.clear();
        window.location.href = "/login";
    }

    const allJobs = Object.entries(allJobsStats).map(entry => {
        const job = {'id': entry[0], ...entry[1]}

        return job;
    });

    useEffect(() => {
        console.log("useEffect ran on ApiContext.js");
    }, [user])

    return (
        <ApiContext.Provider value = {{ user, login, logout, allJobs}}>
            {props.children}
        </ApiContext.Provider>
    )
}

export default ApiContextProvider;