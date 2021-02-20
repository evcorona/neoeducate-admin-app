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
  Table,
  ButtonGroup,
} from 'reactstrap'
import '../Css/schools.css';

import SchoolCard from '../Components/SchoolCard/index'
import SchoolRow from '../Components/SchoolRow/index'
import DataAPI from '../Components/Other/DataAPI'
import TierValue from '../Components/Other/TierValue'

function Schools() {
  /* Common vars */
  const endpoint = DataAPI().endpoint + DataAPI().schoolRoute

  /* Hooks */
  const [schoolsCollection, setSchoolsCollection] = useState({})

  /* Actions */
  const getSchools = () => {

    fetch(endpoint,
      {
        headers: { "Authorization": localStorage.getItem("neojwt") }
      })
      .then(response => response.json())
      .then(json => {
        setSchoolsCollection(json.data)
      })

  }

  useEffect(() => {
    getSchools()
  }, [])


  return (
    <>
      <Row className="mb-4">
        <Col xs="12" className="schools rounded">
          <div className="school-header">
            <h1 className="text-center mb-4">Enrolled Schools</h1>
            <ButtonGroup className="d-flex align-items-center justify-content-between rounded d-md-none">
              <Button className="btn-filter">Name</Button>
              <Button className="btn-filter">Date</Button>
              <Button className="btn-filter">Tier</Button>
            </ButtonGroup>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs="12" className="d-md-none card-container">
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
        <Col md="12" className="d-none d-md-block table-container">
          <Table hover>
            <thead>
              <tr>
                <th className="btn-filter">#</th>
                <th className="btn-filter">School</th>
                <th className="btn-filter">Enrrollment Date</th>
                <th className="btn-filter">Credit Card</th>
                <th className="btn-filter">Type of Plan</th>
                <th className="btn-filter">Quantity of Users</th>
                <th className="btn-filter">Category</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(schoolsCollection).map(item => {
                  let { nameSchool, enrrolmentDate, typePlan, card, qtyUsers, _id } = schoolsCollection[item]
                  return (
                    <SchoolRow
                      noItem={parseInt(item)+1}
                      nameSchool={nameSchool}
                      enrrolmentDate={enrrolmentDate}
                      typePlan={typePlan}
                      qtyUsers={qtyUsers}
                      tier={TierValue(qtyUsers)}
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
    </>
  );
}

export default Schools;
