import React from "react";
import { SideNavData } from "./SideNavData";
import "./SideData.css";

function SideNav() {
  return (
    <div className="navSide">
      <ul className="navSideList">
        {SideNavData.map((val, key) => {
          return (
            <li
              key={key}
              className="row"
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              <image src="https://www.example.com/foo.jpg" />
              <div>{val.ican}</div>
              <div>{val.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SideNav;
