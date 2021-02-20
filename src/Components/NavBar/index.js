/* Import Tools */
import React, { useState } from 'react';
import {
  Link
} from "react-router-dom";

/* Import Styles */
import {
  Container,
  Button,
  Input,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import '../../Css/navbar.css';

/* Import Components */
import logo from '../../Images/logo.svg'

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const signOut = () => {
    localStorage.removeItem("neojwt")
    window.location.reload()
  }

  return (
    <Navbar color="white" light expand="md" className="neo-nav mb-3 p-0">
      <Container>
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Neo Educate" />
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="w-100 d-flex align-items-center justify-content-around" navbar>
            <NavItem>
              <Link className="nav-link font-weight-bold text-secondary" to="/">Dashboard</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link font-weight-bold text-secondary" to="/schools">Schools</Link>
            </NavItem>
            <NavItem className="flex-shrink-1">
              <Link className="nav-link font-weight-bold text-secondary" to="/schools">
                <Input type="search" name="search" placeholder="Search school..." />
              </Link>
            </NavItem>
            <NavItem>
              <Button type="submit" className="my-2 border-0 rounded-pill btn-addSchool">
                <Link className="nav-link text-white font-weight-bold text-nowrap" to="/new-school">Add a School</Link>
              </Button>
            </NavItem>
            <UncontrolledDropdown>
              <DropdownToggle nav className="p-2 fa fa-user-circle-o">
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem text >UserName</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={signOut}>Sign Out</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
