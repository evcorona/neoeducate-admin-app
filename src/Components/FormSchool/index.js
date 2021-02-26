/* Import Styles */
import { Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap'

export default function FormSchool(props) {
  const { handlerSubmit, changeHandler, schoolData, cardAlert } = props

  return (
    <Form onSubmit={handlerSubmit}>
      <FormGroup>
        <Label>Name</Label>
        <Input
          type="text"
          name="nameSchool"
          placeholder="Write here the amazing academy..."
          onChange={changeHandler}
          value={!schoolData.nameSchool ? "" : schoolData.nameSchool} />
      </FormGroup>
      <FormGroup>
        <Label>Enrollment Date as Client</Label>
        <Input
          type="date"
          name="enrrolmentDate"
          placeholder="YYYY-MM-DD"
          onChange={changeHandler}
          value={!schoolData.enrrolmentDate ? "" : schoolData.enrrolmentDate} />
      </FormGroup>
      <FormGroup>
        <Label>Associated credit card for payments</Label>
        <Input
          type="number"
          name="card"
          placeholder="XXXX-XXXX-XXXX-XXXX"
          onChange={changeHandler}
          value={!schoolData.card ? "" : schoolData.card}
          className={`form-control ${cardAlert}`} />
        <FormFeedback>Invalid card number. It must be 16 digits.</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label>Type of plan service</Label>
        <Input
          type="select"
          name="typePlan"
          onChange={changeHandler}
          value={!schoolData.typePlan ? "Select an option of the list..." : schoolData.typePlan}>
          <option disabled selected>Select an option of the list...</option>
          <option value="plan1">Plan 1</option>
          <option value="plan2">Plan 2</option>
          <option value="plan3">Plan 3</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label>Quantity of users</Label>
        <Input
          type="number"
          name="qtyUsers"
          min="1"
          step="10"
          placeholder="Set the number of users..."
          onChange={changeHandler}
          value={!schoolData.qtyUsers ? "" : schoolData.qtyUsers} />
      </FormGroup>
    </Form>)
}