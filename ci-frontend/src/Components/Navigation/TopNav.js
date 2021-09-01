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
                <a className = "navbar-brand fw-bold text-uppercase me-auto ms-4" href = "#">Ci-Visualizer</a>
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
                            <a 
                                className = "nav-link dropdown-toggle" 
                                href = "#" 
                                id = "navbarDropdown" 
                                role = "button" 
                                data-bs-toggle = "dropdown" 
                                aria-expanded = "false"
                            >
                                Jobs
                            </a>
                            <ul className = "dropdown-menu dropdown-menu-end" aria-labelledby = "navbarDropdown">
                                <li><a className = "dropdown-item" href = "#">Action</a></li>
                                <li><a className = "dropdown-item" href = "#">Another action</a></li>
                                <li><hr className = "dropdown-divider"/></li>
                                <li><a className = "dropdown-item" href = "#">Something else here</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default TopNav;