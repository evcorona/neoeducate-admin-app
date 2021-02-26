/* Import Tools */
import React, { useState, useEffect } from 'react';

/* Import Styles */
import { Row, Col, Card, CardText, CardBody, CardTitle } from 'reactstrap'

/* Import Components */
import Endpoint from '../Components/Endpoint/index'
import Img1 from '../Images/boy.svg'

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
    <Row className="bottom-animation dashboard">
      <Col xs="12" className="text-center" tag="h1">Insights</Col>
      <Col xs="12" md="6" className="order-2 order-md-1 d-flex flex-column-reverse justify-content-center align-items-center">
        <img src={Img1} className="m-2 mt-3 img-dashdesktop w-100 d-none d-md-block" alt="Neo Educate" />
      </Col>
      <Col xs="12" md="6" className="order-1 order-md-2 container p-3">
        <Card className="mx-3 mb-3 py-2 text-center shadow">
          <CardBody>
            <CardTitle tag="h5">Enrrolled Schools</CardTitle>
            <CardText tag="h3">{schoolsCollection.length}</CardText>
          </CardBody>
        </Card>
        <Card className="mx-3 mb-3 py-2 text-center shadow">
          <CardBody>
            <CardTitle tag="h5">Total Users</CardTitle>
            <CardText tag="h3">
              {schoolsCollection.reduce((accum, school) => school.qtyUsers + accum, 0)}</CardText>
          </CardBody>
        </Card>
        <Card className="mx-3 mb-3 py-2 text-center shadow">
          <CardBody>
            <CardTitle tag="h5">Top School</CardTitle>
            <CardText tag="h3">{topSchool.nameSchool}</CardText>
            <CardText tag="h4">{topSchool.qtyUsers} users</CardText>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
