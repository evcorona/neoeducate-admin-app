/* Import Tools */
import React, { useState } from 'react';
import { Link } from "react-router-dom";

/* Import Styles */
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'

/* Import Components */
import logo from '../../Images/logo.svg'

export default function NavBar() {
  /* Hooks */
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

console.log(window.location.pathname)

  /* Actions */
  const signOut = () => {
    localStorage.removeItem("neojwt")
    window.location.reload()
  }

  /* Render */
  return (
    <Navbar color="white" light expand="md" className="neo-nav shadow fixed-top">
      <Container>
        <Link className="navbar-brand d-block d-md-none" to="/">
          <img src={logo} alt="NeoEducate" />
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="w-100 d-flex align-items-center justify-content-between" navbar>
            <Link className="navbar-brand d-none d-md-block" to="/">
              <img src={logo} alt="NeoEducate" />
            </Link>
            <NavItem>
              <Link className="nav-link font-weight-bold text-secondary d-none d-md-block" to="/">Dashboard</Link>
              <Link className="nav-link font-weight-bold text-secondary d-md-none" to="/" onClick={toggle}>Dashboard</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link font-weight-bold text-secondary d-none d-md-block" to="/schools">Schools</Link>
              <Link className="nav-link font-weight-bold text-secondary d-md-none" to="/schools" onClick={toggle}>Schools</Link>
            </NavItem>
            <NavItem>
              <Link className="btn btn-brand my-2 border-0 rounded-pill btn-addSchool text-white font-weight-bold text-nowrap d-none d-md-block" to="/new-school">Add a School</Link>
              <Link className="btn btn-brand my-2 border-0 rounded-pill btn-addSchool text-white font-weight-bold text-nowrap d-md-none" to="/new-school" onClick={toggle}>Add a School</Link>
            </NavItem>
            <UncontrolledDropdown>
              <DropdownToggle nav className="p-2 fa fa-user-circle-o">
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem text >Hello!</DropdownItem>
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
