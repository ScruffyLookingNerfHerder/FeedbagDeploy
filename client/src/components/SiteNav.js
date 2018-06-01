import React from "react";
import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Button } from "react-bootstrap";

const SiteNav = () => (

  <Navbar inverse collapseOnSelect>
  <Navbar.Header>
    <Navbar.Brand>
      <a href="/search">Feedbag Search!</a>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav>
    <NavItem eventKey={1} href="/user">
        Userpage
      </NavItem>
    
    <NavItem eventKey={1} href="/recipes">
        Your Recipes
    </NavItem>
    <NavItem eventKey={1} href="/restaurants">
        Your Restaurants
    </NavItem>

    <NavItem eventKey={1} href="/groceries">
        Your Groceries
    </NavItem>


    </Nav>
  </Navbar.Collapse>
</Navbar>

);

export default SiteNav;
