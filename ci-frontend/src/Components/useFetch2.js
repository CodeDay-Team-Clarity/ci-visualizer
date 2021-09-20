import { useState } from 'react';

const useFetch = async (url) => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const creds = JSON.parse(localStorage.getItem('credentials'));
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
            username: creds.username, 
            password: creds.password, 
            url: creds.url,
            job: 'sleeper_simulation-1'
        })
    };

    try{
        const response = await fetch(url, requestOptions)
            if (!response.ok) { // error coming back from server
                // throw Error('could not fetch the data for that resource');
                return false;
            }
        const data = await response.json();
        setData(data);
        setError(null);
        return true;
    }
      
    catch(err) {
        if (err.name === 'AbortError') {
          console.log('fetch aborted')
        } else {
          // auto catches network / connection error
          setError(err.message);
        }
    }

  return { data, error };
}
 
export default useFetch;