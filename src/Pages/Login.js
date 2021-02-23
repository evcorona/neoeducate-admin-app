/* Import Tools */
import React, { useState } from 'react';

/* Import Styles */
import {
  Container,
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  FormGroup,
  FormFeedback
} from 'reactstrap'
import '../Css/login.css';

/* Import Components */
import logo from '../Images/logo.svg'
import DataAPI from '../Components/Other/DataAPI'

function Login() {
  /* Endpoint */
  const endpoint = DataAPI().endpoint + DataAPI().loginRoute
  const authAlert = "is-invalid"


  /* Hooks */
  const [credential, setCredential] = useState({})
  const [statusAuth, setStatusAuth] = useState("")

  /* Action of Hooks */
  const credentialHandler = event => {
    setStatusAuth("")
    setCredential({ ...credential, [event.target.name]: event.target.value })
  }

  const authHandler = () => {
    
    if (Object.keys(credential).length === 2) {
      fetch(endpoint, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credential),
      }).then(res => res.json())
        .catch(error => setStatusAuth(authAlert))
        .then(response => {
          if (response.success) {
            localStorage.setItem("neojwt", response.data.token)
            window.location.reload()
            return
          }
          setStatusAuth(authAlert)
        })
    }
  }

  const handlerSubmit = event => {
    event.preventDefault();
  };


  return (
    <Container fluid className="login-container">
      <Row>
        <div class="bg-image"></div>
        <Col sm="12" md={{ size: 8, offset: 2 }} className="d-flex flex-column justify-content-center align-items-center login-col">
          <div className="login form-animation rounded d-flex flex-column justify-content-center align-items-center shadow px-4 py-3">
            <img src={logo} className="m-2 mt-3" alt="Neo Educate" />
            <Form onSubmit={handlerSubmit}>
              <FormGroup className="w-100 m-2 text-brand">
                <Label>E-mail</Label>
                <Input type="email" className={`form-control ${statusAuth}`} placeholder="john@neoeducate.com" name="email" onChange={credentialHandler} required />
                <FormFeedback>Incorrect username or password.</FormFeedback>
              </FormGroup>
              <FormGroup className="w-100 m-2 mt-3 text-brand">
                <Label for="floatingInputValue2">Password</Label>
                <Input type="password" className={`form-control ${statusAuth}`} placeholder="**********" name="password" onChange={credentialHandler} required />
                <FormFeedback>Incorrect username or password.</FormFeedback>
              </FormGroup>
              <Button type="submit" className="m-2 mt-3 btn text-light border-0 btn-login rounded-pill w-100" onClick={authHandler}>Sign In</Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
