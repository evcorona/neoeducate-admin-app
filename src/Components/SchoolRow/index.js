/* Import Tools */
import React, { useState } from 'react';

/* Import Components */
import Endpoint from '../Endpoint/index'
import CellInput from './cell-input'
import TierValue from '../AuxiliaryFunctions/TierValue'
import AlertMessages from '../AlertMessages/index'

export default function SchoolRow(props) {
  /* Props */
  const { collection, setAlert } = props

  /* Auxiliar Vars */
  const reset = { status: false, save: "d-none" }
  const editMode = { status: true, edit: "d-none" }
  const { msgCardError, msgSysError, msgEmptyError } = AlertMessages()

  /* Hooks */
  const [schoolSelected, setSchoolSelected] = useState(collection)
  let { noItem, nameSchool, enrrolmentDate, typePlan, qtyUsers, id, card } = schoolSelected
  let tier = TierValue(qtyUsers)
  let tierStyle = tier.toLowerCase().replace(" ", "")

  const [editStatus, setEditStatus] = useState(reset)
  const [deleteStatus, setDeleteStatus] = useState(false)

  /* Actions */
  const editHandler = () => { setEditStatus(editMode) }

  const changeHandler = event => {
    setAlert("")
    setSchoolSelected({ ...schoolSelected, [event.target.name]: event.target.value })
  }

  const validationHandler = () => {
    !nameSchool || !enrrolmentDate || !typePlan || !qtyUsers || !card
      ? setAlert(msgEmptyError)
      : card.length !== 16
        ? setAlert(msgCardError)
        : saveHandler()
  }

  const saveHandler = () => {
    fetch((Endpoint().schools + id), {
      method: 'PATCH',
      headers: Endpoint().headers,
      body: JSON.stringify(schoolSelected),
    }).then(res => res.json())
      .catch(error => setAlert(msgSysError))
      .then(response => {
        if (response.success) {
          setEditStatus(reset)
          setAlert("")
        }
        else (setAlert(msgSysError))
      })
  }

  const deleteHandler = () => {
    fetch((Endpoint().schools + id), {
      method: 'DELETE',
      headers: Endpoint().headers,
    }).then(res => res.json())
      .catch(error => setAlert(msgSysError))
      .then(response => {
        if (response.success) {
          setDeleteStatus(true)
          setAlert("")
        }
        else (setAlert(msgSysError))
      })
  }

  /* Render */
  return (
    !deleteStatus &&
    <tr>
      <th scope="row">{noItem}</th>
      <td>
        <CellInput
          status={editStatus.status}
          defaultValue={nameSchool}
          changeHandler={changeHandler}
          name="nameSchool"
          type="text" />
      </td>
      <td>
        <CellInput
          status={editStatus.status}
          defaultValue={enrrolmentDate}
          changeHandler={changeHandler}
          name="enrrolmentDate"
          type="date" />
      </td>
      <td>
        <CellInput
          status={editStatus.status}
          defaultValue={card}
          changeHandler={changeHandler}
          name="card"
          type="text"
        />
      </td>
      <td>
        <CellInput
          status={editStatus.status}
          defaultValue={typePlan}
          changeHandler={changeHandler}
          name="typePlan"
          type="select" />
      </td>
      <td>
        <CellInput
          status={editStatus.status}
          defaultValue={qtyUsers}
          changeHandler={changeHandler}
          name="qtyUsers"
          type="number"
          min="0"
          step="10" />
      </td>
      <td><small className={`rounded-pill p-2 text-white text-nowrap ${tierStyle}`}>{tier}</small></td>
      <td>
        <i type="button" className={`fa fa-edit text-info rounded px-1 ${editStatus.edit}`} onClick={editHandler} />
        <i type="button" className={`btn-brand-3 text-white rounded p-1 ${editStatus.save}`} onClick={validationHandler}>Save</i>
      </td>
      <td>
        <i type="button" className="fa fa-trash text-danger rounded px-1" onClick={deleteHandler} />
      </td>
    </tr>
  );
}