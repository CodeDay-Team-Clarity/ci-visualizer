// import { NavLink } from "react-router-dom";
import { SideNavData } from "./OffCanvasData";
import { ReactComponent as JenkinsSvg } from '../../images/jenkins-logo-no-text.svg';
import Logout from '../logout';

const OffCanvas = () => {
    return (
        <div>
            <div 
                className = "offcanvas offcanvas-start bg-dark text-white sidebar-nav" 
                tabIndex  ="-1" 
                id = "offcanvasExample" 
                aria-labelledby = "offcanvasExampleLabel"
            >
                <div className = "offcanvas-body p-0 d-flex flex-column">
                    <nav className = "navbar-dark">
                        <ul className = "navbar-nav d-flex flex-column">
                            <li>
                                <div className = "d-flex flex-column">
                                    <JenkinsSvg alt="Jenkins logo" width="50%" height="50%" className="align-self-center my-3"/> 
                                </div>
                            </li>
                            <hr/>
                            {SideNavData.map((val, index) => {
                                return (
                                    <li
                                        className = "d-flex flex-column align-items-end mt-auto mb-3"
                                        key={index}
                                        onClick={() => {
                                            window.location.pathname = val.link;
                                        }}
                                    >
                                        <button
                                            type = "button" 
                                            className = "btn btn-secondary col-6 mx-auto" >
                                            {val.title}
                                        </button>
                                    </li>
                                );
                            })}
                            
                        </ul>
                    </nav>
                    <div className = "d-flex flex-column align-items-end mt-auto mb-3">
                        <Logout/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default OffCanvas;