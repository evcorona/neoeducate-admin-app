/* Import Tools */
import React, { useState, useEffect } from 'react';

/* Import Styles */
import { Row, Col, Table } from 'reactstrap'

/* Components */
import Endpoint from '../Components/Endpoint/index'
import SchoolCard from '../Components/SchoolCard/index'
import SchoolRow from '../Components/SchoolRow/index'
import TierValue from '../Components/AuxiliaryFunctions/TierValue'

export default function Schools() {
  /* Hooks */
  const [schoolsCollection, setSchoolsCollection] = useState({})

  /* Actions */
  const getSchools = () => {
    fetch(Endpoint().schools, { headers: Endpoint().headers })
      .then(response => response.json())
      .then(json => {
        setSchoolsCollection(json.data.reverse())
      })
  }

  useEffect(() => {
    getSchools()
  }, [])

  /* Render */
  return (
    <div className="bottom-animation">
      <Row className="mb-2">
        <Col xs="12" className="schools">
          <div className="school-header">
            <h1 className="text-center mb-2">Enrolled Schools</h1>
            {/*   <Input className="d-block d-lg-none mb-2" type="search" name="search" placeholder="Search school..." />
            <ButtonGroup className="d-flex align-items-center justify-content-between rounded d-lg-none">
              <Button className="btn-filter">Name</Button>
              <Button className="btn-filter">Date</Button>
              <Button className="btn-filter">Tier</Button>
            </ButtonGroup> */}
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs="12" className="d-lg-none card-container">
          {
            Object.values(schoolsCollection).map(school => {
              let { nameSchool, enrrolmentDate, typePlan, qtyUsers, _id } = school
              return (
                <SchoolCard
                  nameSchool={nameSchool}
                  enrrolmentDate={enrrolmentDate}
                  typePlan={typePlan}
                  qtyUsers={qtyUsers}
                  tier={TierValue(qtyUsers)}
                  id={_id}
                />
              )
            })
          }
        </Col>
        <Col lg="12" className="d-none d-lg-block table-container">
          <Table hover responsive striped className="text-center" size="">
            <thead>
              <tr>
                <th className="btn-filter" scope="col">#</th>
                <th className="btn-filter" scope="col">School</th>
                <th className="btn-filter" scope="col">Enrrollment Date</th>
                <th className="btn-filter" scope="col">Associated Credit Card</th>
                <th className="btn-filter text-nowrap" scope="col">Typer of Plan</th>
                <th className="btn-filter widthusers" scope="col">Users Qty</th>
                <th className="btn-filter" scope="col">Tier</th>
                <th className="btn-filter" scope="col"></th>
                <th className="btn-filter" scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(schoolsCollection).map(item => {
                  let { nameSchool, enrrolmentDate, typePlan, card, qtyUsers, _id } = schoolsCollection[item]
                  return (
                    <SchoolRow
                      noItem={parseInt(item) + 1}
                      nameSchool={nameSchool}
                      enrrolmentDate={enrrolmentDate}
                      typePlan={typePlan}
                      qtyUsers={qtyUsers}
                      id={_id}
                      card={card}
                    />
                  )
                })
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}
