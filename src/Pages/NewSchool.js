/* Import Tools */
import React, { useState } from 'react';

/* Import Styles */
import { Row, Col, Button, Alert } from 'reactstrap'

/* Components */
import Endpoint from '../Components/Endpoint/index'
import FormSchool from '../Components/FormSchool/index'
import AlertMessages from '../Components/AlertMessages/index'

export default function NewSchool(props) {
  /* Props */
  const { toggle, setModalMessage} = props

  /* Auxiliar Vars */
  const { msgCardError, msgSysError, msgEmptyError } = AlertMessages()

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
      ? setAlert(msgEmptyError)
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
      .catch(error => setAlert(msgSysError))
      .then(response => {
        if (response.success) {
          setNewSchool({})
          setModalMessage({ text: "New school saved!", btnAdd: "" })
          toggle()
        }
        else { setAlert(msgSysError) }
      })
  }

  /* Render */
  return (
    <Row className="bottom-animation">
      <Col xs="12" lg={{ size: 6, offset: 3 }}>
        <h1 className="text-center mb-2">Add a new school!</h1>
        <Alert color="danger" className={alert ? "text-center" : "d-none"}>{alert}</Alert>
        <div className="p-3 news-form rounded shadow">
          <FormSchool
            handlerSubmit={handlerSubmit}
            changeHandler={changeHandler}
            schoolData={newSchool}
            cardAlert={cardAlert}
            msgCardError={msgCardError}
          />
          <Button className="btn btn-brand-2 m-1 rounded-pill text-white font-weight-bold w-100 mb-2" onClick={validationHandler}>Save</Button>
        </div>
      </Col>
    </Row>
  );
}
