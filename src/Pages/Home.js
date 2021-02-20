/* Import Tools */
import React, { useState, useEffect } from 'react';

/* Import Styles */
import {
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  Button,
  CardDeck,
} from 'reactstrap'

/* Import Components */
import DataAPI from '../Components/Other/DataAPI'




function Home() {
  return (
    <CardDeck>
      <Card>
        <CardTitle tag="h5">Total of Schools</CardTitle>
        <CardText>###</CardText>
      </Card>
      <Card>
        <CardTitle tag="h5">Total of Schools</CardTitle>
        <CardText>###</CardText>
      </Card>
    </CardDeck>

  );
}

export default Home;
