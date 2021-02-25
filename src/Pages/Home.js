/* Import Tools */
import React, { useState, useEffect } from 'react';

/* Import Styles */
import {
  Row,
  Col,
  Button,
  CardDeck,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap'
import { Bar } from 'react-chartjs-2';

/* Import Components */
import DataAPI from '../Components/Other/DataAPI'


function Home() {
  /* Common Vars */
  const endpoint = DataAPI().endpoint + DataAPI().schoolRoute

  /* Hooks */
  const [schoolsCollection, setSchoolsCollection] = useState([])
  const [topSchool, setTopSchool] = useState({ nameSchool: "", qtyUsers: 0 })
  const [dataPerYear, setDataPerYears] = useState([])


  /* Actions */
  const getSchools = () => {
    fetch(endpoint,
      {
        headers: { "Authorization": localStorage.getItem("neojwt") }
      })
      .then(response => response.json())
      .then(json => {
        setSchoolsCollection(json.data.reverse())
        const top = json.data.sort((a, b) => b.qtyUsers - a.qtyUsers).slice(0, 1)
        setTopSchool({ nameSchool: top[0].nameSchool, qtyUsers: top[0].qtyUsers })
        setDataPerYears(json.data.map(item => {
          return {
            year: new Date(item.enrrolmentDate).getFullYear(),
            qtyUsers: item.qtyUsers
          }
        }))
      })
  }

  useEffect(() => {
    getSchools()
  }, [])

  const check = () => {
    console.log(topSchool)
    console.log(topSchool[0].nameSchool)
  }

  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  return (
    <div className="page-animation">
      <Row className="mb-2">
        <Col xs="12" className="schools">
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
                  {
                    schoolsCollection.reduce((accum, school) => {
                      return school.qtyUsers + accum
                    }, 0)
                  }</CardText>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <CardTitle tag="h5">Top School</CardTitle>
                <CardText>{topSchool.nameSchool}: {topSchool.qtyUsers} users</CardText>
              </CardBody>
            </Card>
          </CardDeck>
         {/*   <Bar
            data={data}
            width={100}
            height={50}
            options={options} 
          /> */}
        </Col>
      </Row>
    </div >
  );
}

export default Home;
