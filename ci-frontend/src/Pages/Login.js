import { useState, useEffect, useContext } from 'react';
import { Context } from '../Store/appContext';

import {ReactComponent as JenkinsSvg} from '../images/jenkins-logo-no-text.svg';
import validation from '../Components/validation';

const Login = () => {
    const { store, actions } = useContext(Context);

    const isLoggedIn = JSON.parse(localStorage.getItem('loggedIn'));

    // const [valid, setValid] = useState(true);
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        username: "",
        password: "",
        url: "",
    });

    useEffect(() => {
        console.log('useEffect ran on login.js');
        (isLoggedIn === true) ?
            actions.getAllJobsStats().then(() => window.location.href = '/')
            :
            console.log('not logged in')
    }, [isLoggedIn, actions])

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleClick = (e) => {
        e.preventDefault();
        actions.login(values.username, values.password, values.url);
        setErrors(validation(values));
    };

    return (
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
                        className={`form-control ${store.valid ? '' : 'is-invalid'}`}
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={values.username}
                        onChange={handleChange}
                    />
                    {errors.username && <p className="error">{errors.username}</p>}
                </div>
                <div className="col-sm-6 col-md-5 col-lg-4 col-xl-3 col-xxl-2 p-2 m-auto text-center">
                    <input
                        className={`form-control ${store.valid ? '' : 'is-invalid'}`}
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <div className="col-sm-6 col-md-5 col-lg-4 col-xl-3 col-xxl-2 p-2 m-auto text-center">
                    <input
                        className={`form-control ${store.valid ? '' : 'is-invalid'}`}
                        type="text"
                        name="url"
                        placeholder="Jenkins Url"
                        value={values.url}
                        onChange={handleChange}
                    />
                    {errors.url && <p className="error">{errors.url}</p>}
                    {!store.valid && <p className="lead text-danger fw-bold">Invalid login credentials</p>}
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
    )
}

export default Login;