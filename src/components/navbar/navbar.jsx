import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg">
      <Navbar.Brand>
        <Link style={{ textDecoration: "none" }} to="/">
          <span className="brandText">Smart Lock</span>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item style={{marginLeft: '20px'}}>
            <Link style={{ textDecoration: "none" }} to="/admin">
              <span className="pages">Admin</span>
            </Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavigationBar;