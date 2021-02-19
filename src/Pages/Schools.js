/* Import Tools */
import React, { useState, useEffect } from 'react';
import {
  Link
} from "react-router-dom";

/* Import Styles */
import {
  Row,
  Col,
  Button,
  Form,
  Input,
  ButtonGroup,
  Card,
  CardTitle,
  CardSubtitle,
  CardText,
  CardFooter,
  CardBody,
} from 'reactstrap'
import '../Css/schools.css';

function Schools() {


  return (
    <Row>
      <Col xs="12" className="schools p-5 rounded shadow">
        <div className="school-header">
          <h1 className="text-center mb-4">Enrolled Schools</h1>
          <div className="d-flex align-items-center justify-content-between">
            <Form className="schools-check d-none d-md-block mr-2">
              <Input type="checkbox" name="allCheckboxes" />
            </Form>
            <ButtonGroup className="d-flex align-items-center justify-content-center rounded flex-grow-1">
              <Button className="flex-fill btn btn-secondary">Name</Button>
              <Button className="flex-fill btn btn-secondary">Enrollment Date</Button>
              <Button className="flex-fill btn btn-secondary">Tier</Button>
            </ButtonGroup>
          </div>
        </div>

        <div className="card-container mt-4">
          <Card className="d-flex flex-md-row justify-content-center align-items-center">
            <Form className="schools-check d-none d-md-block border-0">
              <Input type="checkbox" name="id" />
            </Form>
            
              <CardBody className="border-0">
              <Link to="/school-detail" className="d-flex flex-md-row align-items-center">
                <div>
                  <CardTitle tag="h3">School </CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted mt-3">Enrollment Date as Client</CardSubtitle>
                  <small className="rounded-pill bg-warning px-3 py-1">Tier</small>
                </div>
                <div className="ml-4">
                  <CardText>Associated credit card for payments</CardText>
                  <CardText>Type of plan service</CardText>
                  <CardText>Quantity of users</CardText>
                </div>
                </Link>
              </CardBody>
            <CardFooter className="border-0">
              <ButtonGroup className="d-flex flex-row flex-md-column justify-content-center align-items-center">
                <Button outline color="danger" className="my-md-3 px-4 flex-fill btn-delete">Delete</Button>
                <Button className="px-4 flex-fill btn-edit border-0">Edit</Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </div>

      </Col>
    </Row>
  );
}

export default Schools;
