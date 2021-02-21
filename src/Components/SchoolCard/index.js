/* Import Tools */
import {
  Link
} from "react-router-dom";

/* Import Styles */
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from 'reactstrap'

/* Components */
import image from '../../Images/student.svg'

function SchoolCard(props) {
  const { nameSchool, enrrolmentDate, typePlan, qtyUsers, tier, id } = props
  const tierStyle = tier.toLowerCase().replace(" ", "")

  return (
    <Card className="mb-2 d-flex flex-column flex-md-row">
      <CardBody className="border-0">
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
          <span className="pr-3 font-weight-bold">Category:</span>
          <span className={`rounded-pill p-2 text-white ${tierStyle}`}>{tier}</span>
        </CardText>
      </CardBody>
      <Link to={`/school-detail?schoolID=${id}`} >
        <Button color="secondary" className="text-center text-white w-100" >
          <img src={image} alt="students" className="py-3 d-none d-md-block" />
          <i className="fa fa-edit mr-2"></i>
          <span>Edit Mode</span>
        </Button>
      </Link>
    </Card>
  );
}

export default SchoolCard;