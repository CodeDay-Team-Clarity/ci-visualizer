import { useContext, useState, useEffect } from 'react';
import { ApiContext } from '../Contexts/ApiContext';

import { ReactComponent as JenkinsSvg } from '../images/jenkins-logo-no-text.svg';

// import '../Styles/login.css';

const Login = () => {
    const { login } = useContext(ApiContext);

    const [values, setValues] = useState({
        username: "",
        password: "",
        url: "",
    });

    const loggedIn = localStorage.getItem('userLoggedIn');
    useEffect(() => {
        console.log('useEffect ran on login.js');
        localStorage.setItem('user', JSON.stringify(values));
        if(loggedIn){
            window.location.href = '/';
        };
    }, [loggedIn]);

    // const [valid, setValid] = useState(true);
    // const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleClick = (e) => {
        e.preventDefault();
        login(values.username, values.password, values.url);
        // setErrors(validation(values));
    };


    return (
        <>
            <div className="container-fluid align-items-center pt-5 pb-5">
                <form className="container-fluid text-center">
                    <h1 className="p-4">
                        Please Log In
                    </h1>
                    <div>
                        <JenkinsSvg/>
                    </div>
                    <h2 className="fw-bold text-uppercase">
                        Ci-Visualizer
                    </h2>
                    <div className="col-sm-6 col-md-5 col-lg-4 col-xl-3 col-xxl-2 p-2 m-auto text-center">
                        <input
                            className={`form-control`}
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={values.username}
                            onChange={handleChange}
                        />
                        {/* {errors.username && <p className="error">{errors.username}</p>} */}
                    </div>
                    <div className="col-sm-6 col-md-5 col-lg-4 col-xl-3 col-xxl-2 p-2 m-auto text-center">
                        <input
                            className={`form-control`}
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange}
                        />
                        {/* {errors.password && <p className="error">{errors.password}</p>} */}
                    </div>
                    <div className="col-sm-6 col-md-5 col-lg-4 col-xl-3 col-xxl-2 p-2 m-auto text-center">
                        <input
                            className={`form-control`}
                            type="text"
                            name="url"
                            placeholder="Jenkins Url"
                            value={values.url}
                            onChange={handleChange}
                        />
                        {/* {errors.url && <p className="error">{errors.url}</p>} */}
                        {/* {!valid && <p className="lead text-danger fw-bold">Invalid login credentials</p>} */}
                    </div>
                    <div className="col-md-2 m-auto p-2">
                        <button
                            className="btn btn-primary text-center"
                            type="submit"
                            onClick={handleClick}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;