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
    <Row className="mb-2 schools bottom-animation">
      <Col xs="12">
        <h1 className="text-center mb-2">Enrolled Schools</h1>
        <div className="d-lg-none card-container">
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
        </div>
        <Table hover responsive className="shadow text-center d-none d-lg-block table-container">
          <thead>
            <tr>
              <th className="btn-brand-3" scope="col">#</th>
              <th className="btn-brand-3" scope="col">School</th>
              <th className="btn-brand-3" scope="col">Enrrollment Date</th>
              <th className="btn-brand-3" scope="col">Associated Credit Card</th>
              <th className="btn-brand-3 text-nowrap" scope="col">Typer of Plan</th>
              <th className="btn-brand-3 widthusers" scope="col">Users Qty</th>
              <th className="btn-brand-3"scope="col">Tier</th>
              <th className="btn-brand-3" scope="col"></th>
              <th className="btn-brand-3" scope="col"></th>
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
  );
}
