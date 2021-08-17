import React from "react";
import { SideNavData } from "./SideNavData";
//import "../Styles/SideData.css";
import t from "../Image/t.jpg";
// import DashBoard from "./DashBoard.css";

function SideNav() {
  return (
    <div className="navSide">
      <ul className="navSideList">
        <div>
          <img src={t} alt="Jenkins" />
        </div>
        <br />
        {SideNavData.map((val, key) => {
          return (
            <li
              key={key}
              className="row"
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              <div>{val.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SideNav;