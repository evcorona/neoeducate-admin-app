/* Import Tools */
import React, { useState, useEffect } from 'react';
import {
  Link
} from "react-router-dom";

/* Import Styles */
import {
  Nav,
  Container,
  Button,
  Input
} from 'reactstrap'
import '../../Css/navbar.css';

/* Import Components */
import logo from '../../Images/logo.svg'

function NavBar() {
  return (
    <Nav className="navbar navbar-expand-lg navbar-light pt-2 pb-4">
      <Container>
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Neo Educate" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav d-flex flex-row justify-content-around align-items-center w-100">
            <li className="nav-item">
              <Link className="nav-link font-weight-bold text-secondary" to="/">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link font-weight-bold text-secondary" to="/schools">Schools</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link font-weight-bold text-secondary" to="/schools">
                <Input type="search" name="search" placeholder="Search school..." />
              </Link>
            </li>
            <li className="nav-item">
              <Button type="submit" className="my-2 btn px-5 py-1 border-0 rounded-pill">
                <Link className="nav-link text-white font-weight-bold" to="/new-school">Add a School</Link>
              </Button>
            </li>
            <li className="nav-item dropdown">
              <Button className="btn border-0 rounded-circle p-4" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              </Button>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><Link className="dropdown-item" to="/">Sign Out</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </Container>
    </Nav>
  );
}

export default NavBar;
