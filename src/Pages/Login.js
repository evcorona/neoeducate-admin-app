/* Import Tools */
import React, { useState } from 'react';

/* Import Styles */
import {
  Container, Row, Col, Form,
  Label, Input, Button, FormGroup, FormFeedback
} from 'reactstrap'

/* Import Components */
import Logo from '../Images/logo.svg'
import Endpoint from '../Components/Endpoint/index'

export default function Login() {
  /* Hooks */
  const [credential, setCredential] = useState({})
  const [statusAuth, setStatusAuth] = useState("")

  /* Auxiliar Vars */
  const authAlert = "is-invalid"

  /* Action of Hooks */
  const handlerSubmit = event => { event.preventDefault(); };

  const credentialHandler = event => {
    setStatusAuth("")
    setCredential({ ...credential, [event.target.name]: event.target.value })
  }

  const authHandler = () => {
    if (Object.keys(credential).length === 2) {
      fetch(Endpoint().login, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credential),
      }).then(res => res.json())
        .catch(error => setStatusAuth(authAlert))
        .then(response => {
          if (response.success) {
            localStorage.setItem("neojwt", response.data.token)
            window.location.replace("/")
            return
          }
          setStatusAuth(authAlert)
        })
    }
    else { setStatusAuth(authAlert) }
  }

  /* Render */
  return (
    <Container fluid className="login-container">
      <Row>
        <div class="bg-image" />
        <Col sm="12" md={{ size: 8, offset: 2 }} className="d-flex flex-column justify-content-center align-items-center login-col">
          <div className="login bottom-animation rounded d-flex flex-column justify-content-center align-items-center shadow px-4 py-3">
            <img src={Logo} className="m-2 mt-3" alt="Neo Educate" />
            <Form onSubmit={handlerSubmit} className="p-2">
              <FormGroup className="text-brand">
                <Label>E-mail</Label>
                <Input type="email" className={`form-control ${statusAuth}`} placeholder="john@neoeducate.com" name="email" onChange={credentialHandler} />
                <FormFeedback>Try admin@admin.com</FormFeedback>
              </FormGroup>
              <FormGroup className="text-brand">
                <Label for="floatingInputValue2">Password</Label>
                <Input type="password" className={`form-control ${statusAuth}`} placeholder="**********" name="password" onChange={credentialHandler} />
                <FormFeedback>Try admin</FormFeedback>
              </FormGroup>
              <Button type="submit" className="mt-1 btn-brand text-light font-weight-bold border-0 btn-login rounded-pill w-100" onClick={authHandler}>Sign In</Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
