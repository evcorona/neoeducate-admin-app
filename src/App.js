/* Import Tools */
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

/* Import Styles */
import { Container, Row } from 'reactstrap'
import './Css/App.css';

/* Import Pages */
import Login from './Pages/Login'
import Home from './Pages/Home'
import School from './Pages/Schools'
import NewSchool from './Pages/NewSchool'
import SchoolDetail from './Pages/SchoolDetail'

/* Import Components */
import NavBar from './Components/NavBar/index'
import ModalContinue from './Components/ModalContinue/index'

export default function App() {
  /* Hooks */
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});

  /* Actions */
  const toggle = () => setModal(!modal);

  /* Auxiliar Vars */
  let jwt = localStorage.getItem("neojwt")

  return (
    <div className="App">
      <Router>
        {jwt ? (
          <>
            <ModalContinue modal={modal} toggle={toggle} message={modalMessage}/>
            <NavBar />
            <Switch>
              <Container fluid className="mt-3">
                <Row>
                <div className="bg-main"/>
                  <Container>
                    <Route exact path="/">
                      <Home />
                    </Route>
                    <Route path="/schools">
                      <School />
                    </Route>
                    <Route path="/school-detail">
                      <SchoolDetail toggle={toggle} setModalMessage={setModalMessage} />
                    </Route>
                    <Route path="/new-school">
                      <NewSchool toggle={toggle} setModalMessage={setModalMessage} />
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

