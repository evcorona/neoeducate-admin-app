/* Import Tools */
import React, { useState, useEffect } from 'react';
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
  NavbarText
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

    <Navbar color="light" light expand="md" className="pt-2 pb-4 neo-nav">
      <Container>
        <NavbarBrand>
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Neo Educate" />
          </Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto d-flex flex-md-row justify-content-start align-items-md-center " navbar>
            <NavItem>
              <NavLink>
                <Link className="nav-link font-weight-bold text-secondary" to="/">Dashboard</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link className="nav-link font-weight-bold text-secondary" to="/schools">Schools</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link className="nav-link font-weight-bold text-secondary" to="/schools">
                  <Input type="search" name="search" placeholder="Search school..." />
                </Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Button type="submit" className="my-2 btn px-5 py-1 border-0 rounded-pill">
                  <Link className="nav-link text-white font-weight-bold" to="/new-school">Add a School</Link>
                </Button>
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav className="p-2 fa fa-user-circle-o">
              </DropdownToggle>
              <DropdownMenu right>
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
