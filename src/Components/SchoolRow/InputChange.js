/* Import Styles */
import {
  Input
} from 'reactstrap'

export default function InputChange(props) {
  const { status, defaultValue, changeHandler, name, type } = props

  return (
    <>
      {
        status
          ? type !== "select"
            ? <Input
              type={type}
              name={name}
              defaultValue={defaultValue}
              onChange={changeHandler}
            />
            : <Input type="select" name="typePlan" defaultValue={defaultValue} onChange={changeHandler}>
              <option name="plan1">Plan 1</option>
              <option name="plan2">Plan 2</option>
              <option name="plan3">Plan 3</option>
            </Input>
          : <p className="p-0 m-0 text-center"> {defaultValue}</p>
      }
    </>
  )


}