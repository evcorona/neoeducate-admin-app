import { Button } from 'reactstrap'

function SchoolRow(props) {
  const { noItem, nameSchool, enrrolmentDate, typePlan, qtyUsers, tier, id, card } = props
  const tierStyle = tier.toLowerCase().replace(" ", "")

  return (
    <tr>
      <th scope="row">{noItem}</th>
      <td>{nameSchool}</td>
      <td>{enrrolmentDate}</td>
      <td>{card}</td>
      <td>{typePlan}</td>
      <td>{qtyUsers}</td>
      <td> <span className={`rounded-pill px-3 py-1 text-white ${tierStyle}`}>{tier}</span></td>
      <td><i type="button" className="fa fa-edit text-info rounded px-1"></i></td>
      <td><i type="button" className="fa fa-trash text-danger rounded px-1"></i></td>
    </tr>
  );
}

export default SchoolRow;