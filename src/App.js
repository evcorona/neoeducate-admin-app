/* Import Tools */
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

/* Import Styles */
import {
  Container,
  Row,
} from 'reactstrap'
import './App.css';

/* Import Pages */
import Login from './Pages/Login'
import Home from './Pages/Home'
import School from './Pages/Schools'
import NewSchool from './Pages/NewSchool'
import SchoolDetail from './Pages/SchoolDetail'

/* Import Components */
import NavBar from './Components/NavBar/index'

export default function App() {
  /* Common Vars */
  
  let jwt = localStorage.getItem("neojwt")

  return (
    <div className="App">
      <Router>
        {/* FORCING LOGIN */}
        {jwt ? (
          <>
            <NavBar />
            {/* ROUTES TO PAGES */}
            <Switch>
              <Container fluid className="mt-3">
                <Row>
                  <Container>
                      <Route exact path="/">
                        <Home />
                      </Route>
                      <Route path="/schools">
                        <School/>
                      </Route>
                      <Route path="/school-detail">
                        <SchoolDetail/>
                      </Route>    
                      <Route path="/new-school">
                        <NewSchool/>
                      </Route>             
                  </Container>
                </Row>
              </Container>
            </Switch>
          </>
        ) : <Login />}

      </Router>


    </div>
  );
}

