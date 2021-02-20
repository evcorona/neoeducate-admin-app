function SchoolRow(props) {
  const { noItem, nameSchool, enrrolmentDate, typePlan, qtyUsers, tier, id, card } = props
  const tierStyle = tier.toLowerCase().replace(" ", "")

  return (
    <tr>
      <th>{noItem}</th>
      <th>{nameSchool}</th>
      <td>{enrrolmentDate}</td>
      <td>{card}</td>
      <td>{typePlan}</td>
      <td>{qtyUsers}</td>
      <td className={tierStyle}>{tier}</td>
    </tr>
  );
}

export default SchoolRow;