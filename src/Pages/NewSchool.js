/* Import Tools */
import React, { useState } from 'react';

/* Import Styles */
import { Row, Col, Button, Alert } from 'reactstrap'

/* Components */
import Endpoint from '../Components/Endpoint/index'
import FormSchool from '../Components/FormSchool/index'

export default function NewSchool(props) {
  /* Props */
  const { toggle, setModalMessage } = props

  /* Hooks */
  const [newSchool, setNewSchool] = useState({})
  const { nameSchool, enrrolmentDate, typePlan, qtyUsers, card } = newSchool
  
  const [alert, setAlert] = useState("")
  const [cardAlert, setCardAlert] = useState("")

  /* Action of Hooks */
  const handlerSubmit = event => { event.preventDefault(); };

  const changeHandler = event => {
    setAlert("")
    setCardAlert("")
    setNewSchool({ ...newSchool, [event.target.name]: event.target.value })
  }

  const validationHandler = () => {
    !nameSchool || !enrrolmentDate || !typePlan || !qtyUsers || !card
    ? setAlert("Oops! Please complete all the fields.")
    : card.length !== 16
      ? setCardAlert("is-invalid")
      : saveHandler()
  }

  const saveHandler = () => {
    fetch(Endpoint().schools, {
      method: 'POST',
      headers: Endpoint().headers,
      body: JSON.stringify(newSchool),
    }).then(res => res.json())
      .catch(error => setAlert(`[${error}] Please try again. If the problem persists, contact support.`))
      .then(response => {
        if (response.success) {
          setNewSchool({})
          setModalMessage({ text: "New school saved!", btnAdd: "" })
          toggle()
        }
        else { setAlert("Please try again. If the problem persists, contact support.") }
      })
  }

  /* Render */
  return (
    <Row className="bottom-animation">
      <Col xs="12" md={{ size: 7, offset: 3 }}>
        <h1 className="text-center mb-2">Add a new school!</h1>
        <Alert color="danger" className={alert ? "text-center" : "d-none"}>{alert}</Alert>
        <div className="p-3 news-form rounded shadow">
          <FormSchool
            handlerSubmit={handlerSubmit}
            changeHandler={changeHandler}
            schoolData={newSchool}
            cardAlert={cardAlert}
          />
          <Button className="btn btn-brand-2 m-1 rounded-pill text-white font-weight-bold w-100" onClick={validationHandler}>Save</Button>
        </div>
      </Col>
    </Row>
  );
}
