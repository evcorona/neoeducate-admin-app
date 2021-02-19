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
  const endpoint = "https://cherry-practices-default-rtdb.firebaseio.com/neoeducate/users/.json"
  const authAlert = { text: "Credencial inválida. Volver a intentar", style: "alert alert-danger mt-3" }
  const emailPattern = "[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+"


  /* Hooks */
  const [credential, setCredential] = useState({})
  const [statusAuth, setStatusAuth] = useState({})

  /* Action of Hooks */
  const credentialHandler = event => {
    setStatusAuth({})
    setCredential({ ...credential, [event.target.name]: event.target.value })
  }

  const authHandler = () => {
    localStorage.setItem("neojwt", "Soy un token bien chingón by VX")
    window.location.reload()

    /*     
        fetch(endpoint, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credential),
        }).then(res => res.json())
          .catch(error => console.error('Error', error))
          .then(response => {
            response.success === false ? setStatusAuth(authAlert) : localStorage.setItem("neojwt", response.data.token)
          }) */
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
              <Input type="password" className="form-control" placeholder="**********" name="password" onChange={credentialHandler}  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"/>
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
