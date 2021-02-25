import { Link } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

export default function ModalNewSchool(props) {
  const { modal, toggle, message } = props

  return (
    <Modal isOpen={modal} toggle={toggle} backdrop="static">
      <ModalBody>
        <h3 className="text-center p-3">{message.text}<span className="ml-2 fa fa-check-circle text-success" /></h3>
      </ModalBody>
      <ModalFooter>
        <Link to='/schools' onClick={toggle}>
          <Button className="btn-back"><span className="fa fa-home mr-1" />Return</Button>
        </Link>
        <Button className={`btn-brand-2 ${message.btnAdd}`} onClick={toggle}><span className="fa fa-plus-circle mr-1" />Add more</Button>
      </ModalFooter>
    </Modal >
  );
}