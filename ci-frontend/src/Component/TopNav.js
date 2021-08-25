import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";

function TopNav() {
  return (
    <>
      <Navbar bg="dark" variant="light">
        <Container>
          <Navbar.Brand href="#DashBoard">
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Jobs
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/Dashboard">job1</Dropdown.Item>
                <Dropdown.Item href="#/action-2">job2</Dropdown.Item>
                <Dropdown.Item href="#/action-3">job3</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Brand>
          <Nav className="me-auto"></Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default TopNav;
