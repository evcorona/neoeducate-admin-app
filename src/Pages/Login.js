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
  Button
} from 'reactstrap'
import '../Css/login.css';
import logo from '../Images/boy.svg'

function Login() {
  /* Endpoint */
  const endpoint = "https://neoeducate-admin-api.vercel.app/auth/login"
  const authAlert = { text: "Credencial inválida. Volver a intentar", style: "alert alert-danger mt-3" }


  /* Hooks */
  const [credential, setCredential] = useState({})
  const [statusAuth, setStatusAuth] = useState({})

  /* Action of Hooks */
  const credentialHandler = event => {
    setStatusAuth({})
    setCredential({ ...credential, [event.target.name]: event.target.value })
  }

  const authHandler = () => {
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


  return (
    <Container fluid className="login-bg">
      <Row>
        <Col sm="12" md={{ size: 8, offset: 2 }} className="d-flex flex-column justify-content-center align-items-center login-col">
          <div className="login p-5 rounded d-flex flex-column justify-content-center align-items-center shadow">
            <img src={logo} className="mb-2" alt="Neo Educate" />
            <Form className="w-100 my-2 text-brand">
              <Label>Correo electrónico</Label>
              <Input type="email" className="form-control" placeholder="john@neoeducate.com" name="email" onChange={credentialHandler} />
            </Form>
            <Form className="w-100 my-2 text-brand">
              <Label for="floatingInputValue2">Contraseña</Label>
              <Input type="password" className="form-control" placeholder="**********" name="password" onChange={credentialHandler} />
            </Form>
            <Button type="submit" className="my-2 btn px-5 py-2 text-light border-0 btn-login rounded-pill w-100" onClick={authHandler} >Acceder</Button>
            <div className={statusAuth.style}>{statusAuth.text}</div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
