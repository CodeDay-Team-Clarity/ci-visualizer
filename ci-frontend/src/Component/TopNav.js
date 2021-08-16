import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function TopNav() {
  return (
    <>
      <nav className="topnav">
        <div className="topnav-container">
          <Nav variant="pills" defaultActiveKey="/Dashboard">
            <Nav.Item>
              <Nav.Link href="/Dashboard">job 1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/SideNav">job 2</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="/Dashboard-2">job 3</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </nav>
    </>
  );
}

export default TopNav;
