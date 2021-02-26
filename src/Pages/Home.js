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
  CardSubtitle,
  CardImg
} from 'reactstrap'

/* Import Components */
import Endpoint from '../Components/Endpoint/index'
import Img1 from '../Images/boy.svg'
import Img2 from '../Images/women2.svg'

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
    <Row className="mb-2 bottom-animation dashboard">
      <Col xs="12" md="6" className="order-2 order-md-1 d-flex flex-column-reverse justify-content-center align-items-center">
        <img src={Img1} className="m-2 mt-3 w-100 d-none d-md-block" alt="Neo Educate" />
        <img src={Img2} className="m-2 mt-3 img-dash d-md-none" alt="Neo Educate" />
      </Col>
      <Col xs="12" md="6" className="order-1 order-md-2 container p-3">
        <h1 className="text-center mb-2">Insights</h1>
        <Card className="m-3 py-3 text-center">
          <CardBody>
            <CardTitle tag="h4">Enrrolled Schools</CardTitle>
            <CardText tag="h2">{schoolsCollection.length}</CardText>
          </CardBody>
        </Card>
        <Card className="m-3 py-3 text-center">
          <CardBody>
            <CardTitle tag="h4">Total Users</CardTitle>
            <CardText tag="h2">
              {schoolsCollection.reduce((accum, school) => school.qtyUsers + accum, 0)}</CardText>
          </CardBody>
        </Card>
        <Card className="m-3 py-3 text-center">
          <CardBody>
            <CardTitle tag="h4">Top School</CardTitle>
            <CardText tag="h2">{topSchool.nameSchool}</CardText>
            <CardText tag="h2">{topSchool.qtyUsers} users</CardText>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
