import React, { useState } from 'react';
import {
  Link
} from "react-router-dom";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function ModalNewSchool(props) {
  const { modal, toggle } = props

  return (
    <Modal isOpen={modal} toggle={toggle} backdrop="static">
      <ModalHeader toggle={toggle}>New school added succesfully</ModalHeader>
      <ModalFooter>
        <Link to='/schools'>
          <Button color="success" onClick={toggle}>Go to the list</Button>
        </Link>
        <Button color="primary" onClick={toggle}>Add more</Button>
      </ModalFooter>
    </Modal >
  );
}
