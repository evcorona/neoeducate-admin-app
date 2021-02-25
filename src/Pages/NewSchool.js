/* Import Tools */
import React, { useState } from 'react';

/* Import Styles */
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap'

/* Components */
import Endpoint from '../Components/Endpoint/index'

export default function NewSchool(props) {
  /* Props */
  const { toggle, setModalMessage } = props

  /* Hooks */
  const [newSchool, setNewSchool] = useState({})

  /* Action of Hooks */
  const handlerSubmit = event => { event.preventDefault(); };

  const changeHandler = event => {
    setNewSchool({ ...newSchool, [event.target.name]: event.target.value })
  }

  const saveHandler = () => {
    if (Object.keys(newSchool).length === 5) {
      fetch(Endpoint().schools, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("neojwt")
        },
        body: JSON.stringify(newSchool),
      }).then(res => res.json())
        .catch(error => console.error('Error', error))
        .then(response => {
          setNewSchool({})
          setModalMessage({ text: "New school saved!", btnAdd: "" })
          toggle()
        })
    }
  }

  /* Render */
  return (
    <Row className="bottom-animation">
      <Col xs="12" md={{ size: 7, offset: 3 }}>
        <h1 className="text-center mb-2">Add a new school!</h1>
        <Form className="p-3 news-form rounded shadow" onSubmit={handlerSubmit}>
          <FormGroup>
            <Label>Name</Label>
            <Input
              type="text"
              name="nameSchool"
              placeholder="Write here the amazing academy..."
              onChange={changeHandler}
              value={!newSchool.nameSchool ? "" : newSchool.nameSchool} />
          </FormGroup>
          <FormGroup>
            <Label>Enrollment Date as Client</Label>
            <Input
              type="date"
              name="enrrolmentDate"
              onChange={changeHandler} placeholder="YYYY-MM-DD"
              value={!newSchool.enrrolmentDate ? "" : newSchool.enrrolmentDate} />
          </FormGroup>
          <FormGroup>
            <Label>Associated credit card for payments</Label>
            <Input
              type="number"
              name="card"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              onChange={changeHandler}
              value={!newSchool.card ? "" : newSchool.card} />
          </FormGroup>
          <FormGroup>
            <Label>Type of plan service</Label>
            <Input
              type="select"
              name="typePlan"
              onChange={changeHandler}
              value={!newSchool.typePlan ? "Select an option of the list..." : newSchool.typePlan}>
              <option disabled selected>Select an option of the list...</option>
              <option value="plan1">Plan 1</option>
              <option value="plan2">Plan 2</option>
              <option value="plan3">Plan 3</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>Quantity of users</Label>
            <Input type="number" name="qtyUsers" min="0" step="10" placeholder="Set the number of users..." onChange={changeHandler} value={!newSchool.qtyUsers ? "" : newSchool.qtyUsers} />
          </FormGroup>
          <Button className="btn btn-brand-2 m-1 rounded-pill text-white font-weight-bold w-100" onClick={saveHandler}>Save</Button>
        </Form>
      </Col>
    </Row>
  );
}
