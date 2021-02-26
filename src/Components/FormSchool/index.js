/* Import Styles */
import { Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap'

export default function FormSchool(props) {
  const { handlerSubmit, changeHandler, schoolData, cardAlert, msgCardError } = props

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
        <FormFeedback>{msgCardError}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label>Type of plan service</Label>
        <Input
          type="select"
          name="typePlan"
          onChange={changeHandler}
          value={!schoolData.typePlan ? "Select an option of the list..." : schoolData.typePlan}>
          <option disabled selected>Select an option of the list...</option>
          <option value="Plan 1">Plan 1</option>
          <option value="Plan 2">Plan 2</option>
          <option value="Plan 3">Plan 3</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label>Quantity of users</Label>
        <Input
          type="number"
          name="qtyUsers"
          min="0"
          step="10"
          placeholder="Set the number of users..."
          onChange={changeHandler}
          value={!schoolData.qtyUsers ? "" : schoolData.qtyUsers} />
      </FormGroup>
    </Form>)
}