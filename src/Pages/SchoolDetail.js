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

export default function SchoolDetail() {
  /* Endpoint */
  const endpoint = DataAPI().endpoint + DataAPI().schoolRoute

  /* Hooks */
  const [schoolSelected, setSchoolSelected] = useState({})
  const [editStatus, setEditStatus] = useState(false)
  const [deleteStatus, setDeleteStatus] = useState(false)

  /* Actions */
  const changeHandler = event => {
    setSchoolSelected({ ...schoolSelected, [event.target.name]: event.target.value })
  }

  const handlerSubmit = event => {
    event.preventDefault();
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const schoolID = urlParams.get('schoolID');

    fetch(endpoint+schoolID, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("neojwt")
      },
    }).then(res => res.json())
      .catch(error => console.error('Error', error))
      .then(response => {
        setSchoolSelected(response.data)
      })
  }, [])

  /* Destructuring */
  let { nameSchool, enrrolmentDate, typePlan, qtyUsers, card, _id } = schoolSelected


  const saveHandler = () => {

    fetch(endpoint+_id, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("neojwt")
      },
      body: JSON.stringify(schoolSelected),
    }).then(res => res.json())
      .catch(error => console.error('Error', error))
      .then(response => {
        response.success && setEditStatus(true)
      })
  }

  const deleteHandler = () => {
    fetch(endpoint+_id, {
      method: 'DELETE',
      headers: {
        "Authorization": localStorage.getItem("neojwt")
      },
    }).then(res => res.json())
      .catch(error => console.error('Error', error))
      .then(response => {
        response.success && setDeleteStatus(true)
      })
  }

  return (
    <Row className="form-animation">
      <Col xs="12" md={{ size: 6, offset: 3 }}>
        <h1 className="text-center mb-2">Edit Mode</h1>
        {/*   <div className={editStatus.style}>{editStatus.text}</div> */}
        <Form className="p-3 news-form rounded shadow" onSubmit={handlerSubmit}>
          <FormGroup>
            <Label>Name</Label>
            <Input type="text" name="nameSchool" placeholder="Write here the amazing academy..." onChange={changeHandler} defaultValue={nameSchool} />
          </FormGroup>
          <FormGroup>
            <Label>Enrollment Date as Client</Label>
            <Input type="date" name="enrrolmentDate" onChange={changeHandler} placeholder="YYYY-MM-DD" defaultValue={enrrolmentDate} />
          </FormGroup>
          <FormGroup>
            <Label>Associated credit card for payments</Label>
            <Input type="text" name="card" placeholder="XXX-XXX-XXX-XXX" onChange={changeHandler} minLength="13" maxLength="19" defaultValue={card} />
          </FormGroup>
          <FormGroup>
            <Label>Type of plan service</Label>
            <Input type="select" name="typePlan" onChange={changeHandler} defaultValue={typePlan}>
              <option name="plan1">Plan 1</option>
              <option name="plan2">Plan 2</option>
              <option name="plan3">Plan 3</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>Quantity of users</Label>
            <Input type="number" name="qtyUsers" min="0" step="10" placeholder="Set the number of users..." onChange={changeHandler} defaultValue={qtyUsers} />
          </FormGroup>
          <div className="d-flex flex-row justify-content-between">
            <Button type="submit" className="btn px-5 py-2 rounded-pill" onClick={saveHandler} >Update</Button>
            <Button type="submit" className="btn px-5 py-2 rounded-pill" onClick={deleteHandler} >Delete</Button>
          </div>
        </Form>
      </Col>
    </Row>
  )
}