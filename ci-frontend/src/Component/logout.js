import React from 'react';

const Logout = () => {

    const logout = () => {
        localStorage.clear();
        window.location.href = "/login";
    }
    return (
        <button onClick = {logout}>Logout</button>
    )
}

export default Logout;