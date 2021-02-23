/* Import Tools */
import React, { useState, useEffect } from 'react';

/* Import Styles */
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  ButtonGroup,
} from 'reactstrap'
import '../Css/newschool.css';

/* Components */
import DataAPI from '../Components/Other/DataAPI'
import ModalNewSchool from '../Components/ModalNewSchool/index'

function NewSchool() {
  /* Endpoint */
  const endpoint = DataAPI().endpoint + DataAPI().schoolRoute

  /* Hooks */
  const [newSchool, setNewSchool] = useState({})

  /* Action of Hooks */
  const changeHandler = event => {
    setNewSchool({ ...newSchool, [event.target.name]: event.target.value })
  }

  const saveHandler = () => {
    if (Object.keys(newSchool).length === 5) {
      fetch(endpoint, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("neojwt")
        },
        body: JSON.stringify(newSchool),
      }).then(res => res.json())
        .catch(error => console.error('Error', error))
        .then(response => {
          toggle()
        })

    }
  }

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handlerSubmit = event => {
    event.preventDefault();
  };

  return (
    <Row className="form-animation">
      <ModalNewSchool
        modal={modal}
        toggle={toggle}
      />
      <Col xs="12" md={{ size: 8, offset: 2 }}>
        <h1 className="text-center mb-2">Add a new school!</h1>
        <Form className="p-3 news-form rounded shadow" onSubmit={handlerSubmit}>
          <FormGroup>
            <Label>Name</Label>
            <Input type="text" name="nameSchool" placeholder="Write here the amazing academy..." onChange={changeHandler} />
          </FormGroup>
          <FormGroup>
            <Label>Enrollment Date as Client</Label>
            <Input type="date" name="enrrolmentDate" onChange={changeHandler} placeholder="YYYY-MM-DD" />
          </FormGroup>
          <FormGroup>
            <Label>Associated credit card for payments</Label>
            <Input type="number" name="card" placeholder="XXX-XXX-XXX-XXX" onChange={changeHandler} minLength="13" maxLength="19" />
          </FormGroup>
          <FormGroup>
            <Label>Type of plan service</Label>
            <Input type="select" name="typePlan" onChange={changeHandler} required>
              <option disabled selected>Select an option of the list...</option>
              <option name="plan1">Plan 1</option>
              <option name="plan2">Plan 2</option>
              <option name="plan3">Plan 3</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>Quantity of users</Label>
            <Input type="number" name="qtyUsers" min="0" step="10" placeholder="Set the number of users..." onChange={changeHandler} />
          </FormGroup>
          <div className="d-flex flex-row justify-content-between">
            <input type="reset" value="Clear" className="btn-light px-5 py-2 rounded-pill" />
            <Button className="btn px-5 py-2 rounded-pill" onClick={saveHandler}>Save</Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
}

export default NewSchool;
