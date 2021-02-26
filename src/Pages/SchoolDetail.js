/* Import Tools */
import React, { useState, useEffect } from 'react';

/* Import Styles */
import { Row, Col, Button, Alert } from 'reactstrap'

/* Components */
import Endpoint from '../Components/Endpoint/index'
import FormSchool from '../Components/FormSchool/index'
import AlertMessages from '../Components/AlertMessages/index'

export default function SchoolDetail(props) {
  /* Props */
  const { toggle, setModalMessage } = props

  /* Auxiliar Vars */
  const { msgCardError, msgSysError, msgEmptyError } = AlertMessages()

  /* Hooks */
  const [schoolSelected, setSchoolSelected] = useState({})
  const { nameSchool, enrrolmentDate, typePlan, qtyUsers, card, _id } = schoolSelected

  const [alert, setAlert] = useState("")
  const [cardAlert, setCardAlert] = useState("")

  /* Effects */
  useEffect(() => {
    const schoolID = new URLSearchParams(window.location.search).get('schoolID');
    !schoolID && window.location.replace("/schools")

    fetch(Endpoint().schools + schoolID, { headers: Endpoint().headers })
      .then(res => res.json())
      .catch(error => setAlert(msgSysError))
      .then(response => response.success ? setSchoolSelected(response.data) : setAlert(msgSysError))
  }, [])

  /* Actions */
  const handlerSubmit = event => { event.preventDefault(); };

  const changeHandler = event => {
    setAlert("")
    setCardAlert("")
    setSchoolSelected({ ...schoolSelected, [event.target.name]: event.target.value })
  }

  const validationHandler = () => {
    !nameSchool || !enrrolmentDate || !typePlan || !qtyUsers || !card  
      ? setAlert(msgEmptyError)
      : card.length !== 16
        ? setAlert(msgCardError)
        : saveHandler()
  }

  const saveHandler = () => {
    fetch(Endpoint().schools + _id, {
      method: 'PATCH',
      headers: Endpoint().headers,
      body: JSON.stringify(schoolSelected),
    }).then(res => res.json())
      .catch(error => setAlert(msgSysError))
      .then(response => {
        if (response.success) {
          setModalMessage({ text: "School edited", btnAdd: "d-none" })
          toggle()
        }
        else{setAlert(msgSysError)}
      })
  }

  const deleteHandler = () => {
    fetch(Endpoint().schools + _id, {
      method: 'DELETE',
      headers: Endpoint().headers,
    }).then(res => res.json())
      .catch(error => setAlert(msgSysError))
      .then(response => {
        if (response.success) {
          setModalMessage({ text: "School deleted", btnAdd: "d-none" })
          toggle()
        }
        else{setAlert(msgSysError)}
      })
  }

  /* Render */
  return (
    <Row className="bottom-animation">
      <Col xs="12" md={{ size: 7, offset: 3 }}>
        <h1 className="text-center mb-2">Edit Mode</h1>
        <Alert color="danger" className={alert ? "text-center" : "d-none"}>{alert}</Alert>
        <div className="p-3 editmode-form rounded shadow">
          <FormSchool
            handlerSubmit={handlerSubmit}
            changeHandler={changeHandler}
            schoolData={schoolSelected}
            cardAlert={cardAlert}
          />
          <div className="d-flex flex-row justify-content-center px-1">
            <Button className="btn-delete rounded-pill text-white border-0 m-1 px-4 font-weight-bold" onClick={deleteHandler}>Delete</Button>
            <Button className="btn-brand-2 m-1 rounded-pill text-white font-weight-bold w-100" onClick={validationHandler} >Update</Button>
          </div>
        </div>
      </Col>
    </Row>
  )
}