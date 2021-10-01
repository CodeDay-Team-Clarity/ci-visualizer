import { NavLink } from "react-router-dom";

const TopNav = () => {
    return (
        <nav className = "navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className = "container-fluid">
                <button 
                    className = "navbar-toggler" 
                    type = "button" 
                    data-bs-toggle = "offcanvas" 
                    data-bs-target = "#offcanvasExample" 
                    aria-controls = "offcanvasExample"
                >
                    <span className = "navbar-toggler-icon"/>
                </button>
                <NavLink to = "/" className = "navbar-brand fw-bold text-uppercase me-auto ms-4">Ci-Visualizer</NavLink>
                <button 
                    className = "navbar-toggler" 
                    type = "button" 
                    data-bs-toggle = "collapse" 
                    data-bs-target = "#topNavBar" 
                    aria-controls = "topNavBar" 
                    aria-expanded = "false" 
                    aria-label = "Toggle navigation"
                >
                    <span className = "navbar-toggler-icon"/>
                </button>
                <div className = "collapse navbar-collapse" id = "topNavBar">
                    <ul className = "navbar-nav ms-auto">
                        <li className = "nav-item dropdown">
                            <NavLink 
                                to = "/" 
                                className = "nav-link dropdown-toggle"
                                id = "navbarDropdown" 
                                role = "button" 
                                data-bs-toggle = "dropdown" 
                                aria-expanded = "false"
                            >
                                Jobs
                            </NavLink>
                            <ul className = "dropdown-menu dropdown-menu-end" aria-labelledby = "navbarDropdown">
                                <li><NavLink to = "/" className = "dropdown-item">Action</NavLink></li>
                                <li><NavLink to = "/" className = "dropdown-item">Another action</NavLink></li>
                                <li><hr className = "dropdown-divider"/></li>
                                <li><NavLink to = "/" className = "dropdown-item">Something else here</NavLink></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default TopNav;