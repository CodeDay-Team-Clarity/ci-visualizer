import React from "react";
// import { SideNavData } from "./SideNavData";
// import SideDatas from "../Styles/SideDatas.css";
// import Jenkins from "../images/Jenkins.png";
import { Nav } from "react-bootstrap";
//import DashBoard from "./DashBoard.css";

function SideNav() {
  return (
    // <div className="navSide">
    //   <ul className="navSideList">
    //     <div>
    //       <img src={t} alt="Jenkins" />
    //     </div>
    //     <br />
    //     {SideNavData.map((val, key) => {
    //       return (
    //         <li
    //           key={key}
    //           className="row"
    //           onClick={() => {
    //             window.location.pathname = val.link;
    //           }}
    //         >
    //           <div>{val.title}</div>
    //         </li>
    //       );
    //     })}
    //   </ul>
    // </div>
    <Nav defaultActiveKey="/home" className="flex-column">
      <Nav.Link href="/home">Active</Nav.Link>
      <Nav.Link eventKey="link-1">Link</Nav.Link>
      <Nav.Link eventKey="link-2">Link</Nav.Link>
      <Nav.Link eventKey="disabled" disabled>
        Disabled
      </Nav.Link>
    </Nav>
  );
}

export default SideNav;
