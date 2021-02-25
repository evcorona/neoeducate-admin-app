/* Import Tools */
import React, { useState, useEffect } from 'react';

/* Import Styles */
import {
  Row,
  Col,
  CardDeck,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap'

/* Import Components */
import Endpoint from '../Components/Endpoint/index'

export default function Home() {
  /* Hooks */
  const [schoolsCollection, setSchoolsCollection] = useState([])
  const [topSchool, setTopSchool] = useState({ nameSchool: "", qtyUsers: 0 })

  /* Actions */
  const getSchools = () => {
    fetch(Endpoint().schools, { headers: { "Authorization": localStorage.getItem("neojwt") } })
      .then(response => response.json())
      .then(json => {
        setSchoolsCollection(json.data)
        const top = json.data.sort((a, b) => b.qtyUsers - a.qtyUsers).slice(0, 1)
        setTopSchool({ nameSchool: top[0].nameSchool, qtyUsers: top[0].qtyUsers })
      })
  }

  useEffect(() => {
    getSchools()
  }, [])

  /* Render */
  return (
    <Row className="mb-2 bottom-animation schools">
      <Col xs="12">
        <CardDeck>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Enrrolled Schools</CardTitle>
              <CardText>{schoolsCollection.length}</CardText>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Total Users</CardTitle>
              <CardText>
                {schoolsCollection.reduce((accum, school) => school.qtyUsers + accum, 0)}</CardText>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Top School</CardTitle>
              <CardText>{topSchool.nameSchool}: {topSchool.qtyUsers} users</CardText>
            </CardBody>
          </Card>
        </CardDeck>
      </Col>
    </Row>
  );
}
