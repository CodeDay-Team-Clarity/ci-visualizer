import React, { useState } from 'react';
import { ReactComponent as JenkinsSvg } from '../images/jenkins-logo.svg';
import validation from '../Component/validation';

// import '../Styles/Login.css';

const Login = () => {
    const isLoggedIn = localStorage.getItem('loggedIn');

    const [errors, setErrors] = useState({});

// use this for url for now: 'http://builds.ci-visualizer.com:8080'
    const [values, setValues] = useState({
        username: "",
        password: "",
        url: "",
    });

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const [valid, setValid] = useState(true);

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
                    // alert("there has been a murder!!!");
                    setValid(_valid => false);
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
        login(values.username, values.password, values.url);
        setErrors(validation(values));
    };

    return ( 
        <div className = "container-fluid align-items-center p-5">
            <form className = "container-fluid text-center p-5">
                <h1 className = "p-4">
                    Please Log In
                </h1>
                <picture>
                    <JenkinsSvg className = "p-3"/>
                </picture>
                <div className = "col-md-6 offset-md-3 col-lg-4 offset-lg-4 p-2 text-center">
                    <input 
                        className = {`form-control ${valid ? '' : 'is-invalid'}`}
                        type = "text"
                        name = "username"
                        placeholder = "Username" 
                        value = {values.username} 
                        onChange = {handleChange}
                    />
                    {errors.username && <p className = "error">{errors.username}</p>}
                </div>
                <div className = "col-md-6 offset-md-3 col-lg-4 offset-lg-4 p-2 text-center">
                    <input
                        className = {`form-control ${valid ? '' : 'is-invalid'}`}
                        type = "password"
                        name = "password"
                        placeholder = "Password" 
                        value = {values.password} 
                        onChange = {handleChange}
                    />
                    {errors.password && <p className = "error">{errors.password}</p>}
                </div>
                <div className = "col-md-6 offset-md-3 col-lg-4 offset-lg-4 p-2 text-center">
                    <input 
                        className = {`form-control ${valid ? '' : 'is-invalid'}`}
                        type = "text"
                        name = "url"
                        placeholder = "Jenkins Url" 
                        value = {values.url} 
                        onChange = {handleChange}
                    />
                    {errors.url && <p className = "error">{errors.url}</p>}
                    {!valid && <p className = "lead text-danger fw-bold">Invalid login credentials</p>}
                </div>
                <div className = "col-md-2 offset-md-5 p-2">
                    <button 
                        className = "btn btn-primary text-center"
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