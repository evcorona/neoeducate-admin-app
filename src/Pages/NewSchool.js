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
import DataAPI from '../Components/Other/DataAPI'

function NewSchool() {
  /* Endpoint */
  const endpoint = DataAPI().endpoint + DataAPI().schoolRoute
  const postAlertOK = { text: "School added succesfully!", style: "alert alert-success mt-3 text-center" }

  /* Hooks */
  const [newSchool, setNewSchool] = useState({})
  const [postStatus, setPostStatus] = useState({})

  /* Action of Hooks */
  const changeHandler = event => {
    setPostStatus({})
    setNewSchool({ ...newSchool, [event.target.name]: event.target.value })
  }

  const saveHandler = () => {
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
        setPostStatus(postAlertOK)
      })
  }


  return (
    <Row>
      <Col xs="12" md={{ size: 6, offset: 3 }}>
        <h1 className="text-center mb-4">Add a new school!</h1>
        <div className={postStatus.style}>{postStatus.text}</div>
        <Form className="p-3 news-form rounded shadow">
          <FormGroup>
            <Label>Name</Label>
            <Input type="text" name="nameSchool" placeholder="Write here the amazing academy..." onChange={changeHandler} />
          </FormGroup>
          <FormGroup>
            <Label>Enrollment Date as Client</Label>
            <Input type="date" name="enrrolmentDate" onChange={changeHandler} />
          </FormGroup>
          <FormGroup>
            <Label>Associated credit card for payments</Label>
            <Input type="text" name="card" placeholder="XXX-XXX-XXX-XXX" onChange={changeHandler} />
          </FormGroup>
          <FormGroup>
            <Label>Type of plan service</Label>
            <Input type="select" name="typePlan" onChange={changeHandler}>
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
