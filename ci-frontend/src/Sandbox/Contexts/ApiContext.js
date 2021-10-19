import { createContext, useState, useEffect } from 'react'

export const ApiContext = createContext();

const ApiContextProvider = (props) => {
    
    const [ user, setUser ] = useState({
        username: '',
        password: '',
        url: ''
    });
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ allJobsStats, setAllJobsStats ] = useState({}); 
    const [ jobStats, setJobStats ] = useState({}); 
    // {
    //     "sleeper_simulation-1": {
    //       "avg_duration": 47.0, 
    //       "results": {
    //         "cancel": 1, 
    //         "failure": 0, 
    //         "success": 4
    //       }
    //     }, 
    //     "sleeper_simulation-2": {
    //       "avg_duration": 2.0, 
    //       "results": {
    //         "cancel": 0, 
    //         "failure": 3, 
    //         "success": 0
    //       }
    //     }, 
    //     "sleeper_simulation-4": {
    //       "avg_duration": 0.5, 
    //       "results": {
    //         "cancel": 0, 
    //         "failure": 2, 
    //         "success": 0
    //       }
    //     }, 
    //     "sleeper_simulation-6": {
    //       "avg_duration": 49.166666666666664, 
    //       "results": {
    //         "cancel": 0, 
    //         "failure": 0, 
    //         "success": 6
    //       }
    //     }
    // };

    const backendUrl = (path) => {
      // Should not have a trailing '/'
      // See: https://create-react-app.dev/docs/adding-custom-environment-variables/
      const backendOrigin = process.env.REACT_APP_CI_VISUALIZER_BACKEND_ORIGIN || "http://localhost:5000";
      return backendOrigin + path;
    };

    const login = async (username, password, jenkinsUrl) => {
      const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'username': username,
            'password': password,
            'url': jenkinsUrl
        })
      };
      try {
        const response = await fetch(backendUrl('/login'), requestOptions)
        if (response.status !== 200){
          // setStore({ valid: false });
          console.log({'message': 'connection failed'});
          return false;
        }
        const data = await response.json();
        console.log(data);
        
        setLoggedIn({loggedIn: true})
        localStorage.setItem('userLoggedIn', true);
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('url', jenkinsUrl);
        
        getAllJobsStats();
        return true;
      }
      catch(error) {
          console.error("There has been an error logging in")
      }
    };

    const logout = () => {
        localStorage.clear();
        window.location.href = "/login";
    }

    const getAllJobsStats = async () => {
      try {
        const response = await fetch(backendUrl(`/jobs?username=${localStorage.getItem('username')}&password=${localStorage.getItem('password')}&url=${localStorage.getItem('url')}/`))
        if (!response.ok) {
          console.error('Could not fetch the data for that resource');
          return false;
        }
        const data = await response.json();
        setAllJobsStats({ allJobsStats: data});
        return true;
      }
      catch(error) {
        console.error("There has been an error fetching data")
      }
    };

    const getJobStats = async (job) => {
      try {
        const response = await fetch(backendUrl(`/stats?job=${job}&username=${user.username}&password=${user.password}&url=${user.url}`))
        if (!response.ok) {
          console.error('Could not fetch the data for that resource');
          return false;
        }
        const data = await response.json();
        setJobStats({ jobStats: data});
        console.log(jobStats)
        return true;
      }
      catch(error) {
        console.error("There has been an error fetching data")
      }
    }

    const allJobs = Object.entries(allJobsStats).map(entry => {
        const job = {'id': entry[0], ...entry[1]}
        return job;
    });

    useEffect(() => {
        console.log("useEffect ran on ApiContext.js");
        setUser({username: localStorage.getItem('username'), password: localStorage.getItem('password'), url: localStorage.getItem('url')});
    }, [])

    return (
        <ApiContext.Provider value = {{ user, allJobs, jobStats, login, logout, getAllJobsStats, getJobStats }}>
            {props.children}
        </ApiContext.Provider>
    )
}

export default ApiContextProvider;