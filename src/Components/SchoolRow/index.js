/* Import Tools */
import React, { useState, useEffect } from 'react';

/* Import Components */
import InputChange from '../Other/InputChange'
import DataAPI from '../Other/DataAPI'
import TierValue from '../Other/TierValue'

export default function SchoolRow(props) {
  /* Endpoint */
  const endpoint = DataAPI().endpoint + DataAPI().schoolRoute
  /* Auxiliar Vars */
  const reset = { status: false, save: "d-none" }
  const editMode = { status: true, edit: "d-none" }

  /* Hooks */
  const [editStatus, setEditStatus] = useState(reset)
  const [schoolSelected, setSchoolSelected] = useState(props)
  const [deleteStatus, setDeleteStatus] = useState(false)

  /* Destructuring */
  let { noItem, nameSchool, enrrolmentDate, typePlan, qtyUsers, id, card } = schoolSelected
  let tier=TierValue(qtyUsers)
  const tierStyle = tier.toLowerCase().replace(" ", "")

  /* Actions */
  const editHandler = () => {
    setEditStatus(editMode)
  }

  const saveHandler = () => {
    fetch((endpoint + id), {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("neojwt")
      },
      body: JSON.stringify(schoolSelected),
    }).then(res => res.json())
      .catch(error => console.error('Error', error))
      .then(response => {
        response.success && setEditStatus(reset)
      })
  }

  const changeHandler = event => {
    setSchoolSelected({ ...schoolSelected, [event.target.name]: event.target.value })
  }

  const deleteHandler = () => {
    fetch((endpoint + id), {
      method: 'DELETE',
      headers: {
        "Authorization": localStorage.getItem("neojwt")
      },
    }).then(res => res.json())
      .catch(error => console.error('Error', error))
      .then(response => {
        response.success && setDeleteStatus(true)
      })
  }

  return (
    !deleteStatus &&
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