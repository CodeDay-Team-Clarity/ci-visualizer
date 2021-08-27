import React from 'react';

const Logout = () => {

    const logout = () => {
        localStorage.clear();
        window.location.href = "/login";
    }
    return (
        <button 
            type = "button" 
            className = "btn btn-secondary col-6 mx-auto" 
            onClick = {logout}
        >
            Logout
        </button>
    )
}

export default Logout;