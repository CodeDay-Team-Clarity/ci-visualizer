import React, { useState } from 'react';

import '../Styles/Login.css';

const Login = () => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // use this for url for now: 'http://builds.ci-visualizer.com:8080'
    const [url, setUrl] = useState("");

    if(isLoggedIn){
        window.location.href = "/dashboard";
    };

    const login = async (username, password, url) => {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ 
                'username': username, 
                'password': password, 
                'url': url 
            })
        };
        
        try{
            const response = await fetch('/login', requestOptions)
                if (response.status !== 200){
                    alert("there has been a murder!!!");
                    console.log({"message":"connection failed"});
                    return false;
                }
            const data = await response.json();
            console.log(data);
            localStorage.setItem("loggedIn", true);
            localStorage.setItem("credentials", JSON.stringify({
                'username': username, 
                'password': password, 
                'url': url}));
            window.location.href = "/dashboard";
            return true;
        }
        catch(error){
            console.error("There has been an error logging in")
        }
    };



    const handleClick = (e) => {
        e.preventDefault();
        login(username, password, url);
    };

    return (
        <div className = "login-wrapper">
            <h1>Please Log In</h1>
                <form>
                    <label>
                        <p>Username</p>
                        <input 
                            type = "text" 
                            placeholder = "Username" 
                            value = {username} 
                            onChange = {(e) => setUsername(e.target.value)}
                            />
                    </label>
                    <label>
                        <p>password</p>
                        <input
                            type = "text" 
                            placeholder = "Password" 
                            value = {password} 
                            onChange = {(e) => setPassword(e.target.value)}
                            />
                    </label>
                    <label>
                        <p>url</p>
                        <input 
                            type = "text" 
                            placeholder = "Jenkins Url" 
                            value = {url} 
                            onChange = {(e) => setUrl(e.target.value)}
                            />
                    </label>
                    <div>
                        <button 
                            type = "submit" 
                            onClick = {handleClick}
                            >
                            Submit
                        </button>
                    </div>
                </form>
        </div>
    )
}

export default Login;