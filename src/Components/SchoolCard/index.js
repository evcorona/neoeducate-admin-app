/* Import Tools */
import React, { useState } from 'react';
import {
  Link
} from "react-router-dom";

/* Import Styles */
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  Button,
  Form,
  Input,
  CardFooter,
  ButtonGroup,
  Collapse
} from 'reactstrap'

function SchoolCard(props) {
  const { nameSchool, enrrolmentDate, typePlan, qtyUsers, tier, id } = props
  const tierStyle = tier.toLowerCase().replace(" ","")

  return (
    <Card className="mb-2"> 
      <CardBody className="border-0">
        <Link to={`/school-detail?schoolID=${id}`}>
          <CardTitle>
            <span className="pr-3 h4">{nameSchool}</span>
          </CardTitle>
          <CardText>
            <span className="pr-3 font-weight-bold">Enrrollment date:</span>
            <span>{enrrolmentDate}</span>
          </CardText>
          <CardText>
            <span className="pr-3 font-weight-bold">Plan:</span>
            <span>{typePlan}</span>
          </CardText>
          <CardText>
            <span className="pr-3 font-weight-bold">Quantity:</span>
            <span >{qtyUsers} users</span>
          </CardText>
          <CardText>
            <span className="pr-3 font-weight-bold">Tier</span>
            <span className={`rounded-pill px-3 py-1 text-white ${tierStyle}`}>{tier}</span>
          </CardText>
        </Link>
      </CardBody>
    </Card>
  );
}

export default SchoolCard;