const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			loggedIn: false,
			user: {
				username: '',
				password: '',
				url: ''
			},
			valid: true,
			allJobsStats: {},
			jobName: '',
			jobStats: {},
			jobDurations: {},
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {

			backendUrl: (path) => {
                // Should not have a trailing '/'
                // See: https://create-react-app.dev/docs/adding-custom-environment-variables/
                const backendOrigin = process.env.REACT_APP_CI_VISUALIZER_BACKEND_ORIGIN || "http://localhost:5000";
                return backendOrigin + path;
            },

            login: async (username, password, jenkinsUrl) => {
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
                    const response = await fetch(getActions().backendUrl('/login'), requestOptions)
                    if (response.status !== 200){
						setStore({ valid: false });
                        console.log({'message': 'connection failed'});
                        return false;
                    }
                    const data = await response.json();
                    console.log(data);
                    localStorage.setItem("loggedIn", true);
                    localStorage.setItem("loading", true);
                    localStorage.setItem("credentials", JSON.stringify({
                        'username': username,
                        'password': password,
                        'url': jenkinsUrl
                        })
                    );
					getActions().setUser();
					getActions().getAllJobsStats();
                    return true;
                }
                catch(error) {
                    console.error("There has been an error logging in")
                }
				
            },

			getAllJobsStats: async () => {
				//Get the store
				const store = getStore();

				try {
					const response = await fetch(getActions().backendUrl(`/jobs?username=${store.user.username}&password=${store.user.password}&url=${store.user.url}`))
					if (!response.ok) {
						console.error('Could not fetch the data for that resource');
						return false;
					}
					const data = await response.json();
					setStore({ allJobsStats: data});
					localStorage.setItem('loading', false)
					return true;
				}
				catch(error) {
					console.error("There has been an error fetching data")
				}
				
			},

			getJobStats: async (job) => {
				//Get the store
				const store = getStore();

				try {
					const response = await fetch(getActions().backendUrl(`/stats?job=${job}&username=jenkins&password=codeday&url=http://builds.ci-visualizer.com:8080/`))
					if (!response.ok) {
						console.error('Could not fetch the data for that resource');
						return false;
					}
					const data = await response.json();
					setStore({ jobStats: data });
					console.log(store.jobStats)
					getActions().getDuration();
					return true;
				}
				catch(error) {
					console.error("There has been an error fetching data")
				}
			},

			getDuration: () => {
				const store = getStore();
				const jobDurations = Object.entries(store.jobStats.durations.all_data).map(entry => {
					const job = {'id': entry[0], ...entry[1]};
					return job;
				})
				setStore({jobDurations});
			},

			dateString: (timeStamp) => {
				var d = new Date(timeStamp);
    			return ({date: (()=> d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear()), time: (()=> d.getHours() + ":" + d.getMinutes())}
      				// d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
      				// d.getHours() + ":" + d.getMinutes()
				)
			},

			setUser: () => {
				const creds = JSON.parse(localStorage.getItem('credentials'));
				setStore({user: creds});
				return true;
			},





			// examples below
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();
				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;