import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Modal as BSModal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

const Modal = ({
  modalOpen,
  setModalOpen,
  children,
  modalTitle,
  submit,
  submitTitle,
  submitEnable,
}) => {
  const toggle = () => setModalOpen(!modalOpen);
  return (
    <BSModal isOpen={modalOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={submit} disabled={!submitEnable}>
        <FontAwesomeIcon icon={faSave} /> {submitTitle}
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          <FontAwesomeIcon icon={faTimesCircle} /> Cancelar
        </Button>
      </ModalFooter>
    </BSModal>
  );
};

export default Modal;
