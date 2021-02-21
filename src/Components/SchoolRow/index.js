/* Import Tools */
import React, { useState } from 'react';

/* Import Styles */
import {
  Input
} from 'reactstrap'

/* Import Components */
import InputChange from '../Other/InputChange'

export default function SchoolRow(props) {
  const { noItem, nameSchool, enrrolmentDate, typePlan, qtyUsers, tier, id, card } = props
  const tierStyle = tier.toLowerCase().replace(" ", "")
  const reset = { status: false, save: "d-none" }
  const editMode = { status: true, edit: "d-none" }

  const [editStatus, setEditStatus] = useState(reset)
  const [schoolSelected, setSchoolSelected] = useState({})

  const editHandler = () => {
    setEditStatus(editMode)
  }

  const saveHandler = () => {
    setEditStatus(reset)
    console.log("Envio request")
  }

  const changeHandler = event => {
    setSchoolSelected({ ...schoolSelected, [event.target.name]: event.target.value })
  }

  const deleteHandler = () => {
    console.log("Envio request borrado")
  }

  return (
    <tr>
      <th scope="row">{noItem}</th>
      <td>
        <InputChange
          status={editStatus.status}
          defaultValue={nameSchool}
          changeHandler={changeHandler}
          name="nameSchool"
          type="text" />
      </td>
      <td>
        <InputChange
          status={editStatus.status}
          defaultValue={enrrolmentDate}
          changeHandler={changeHandler}
          name="enrrolmentDate"
          type="date" />
      </td>
      <td>
        <InputChange
          status={editStatus.status}
          defaultValue={card}
          changeHandler={changeHandler}
          name="card"
          type="text" />
      </td>
      <td>
        <InputChange
          status={editStatus.status}
          defaultValue={typePlan}
          changeHandler={changeHandler}
          name="typePlan"
          type="select" />
      </td>
      <td>
        <InputChange
          status={editStatus.status}
          defaultValue={qtyUsers}
          changeHandler={changeHandler}
          name="qtyUsers"
          type="number" />
      </td>
      <td><small className={`rounded-pill p-2 text-white text-nowrap ${tierStyle}`}>{tier}</small></td>
      <td>
        <i type="button" className={`fa fa-edit text-info rounded px-1 ${editStatus.edit}`} onClick={editHandler} />
        <i type="button" className={`text-info rounded px-1 ${editStatus.save}`} onClick={saveHandler}>Save</i>
      </td>
      <td>
        <i type="button" className="fa fa-trash text-danger rounded px-1" onClick={deleteHandler} />
      </td>
    </tr>
  );
}