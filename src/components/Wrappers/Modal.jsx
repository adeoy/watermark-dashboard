import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal as BSModal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

import { setModalOpen } from "../../actions/index";

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
          {submitTitle}
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancelar
        </Button>
      </ModalFooter>
    </BSModal>
  );
};

const mapStateToProps = (state) => {
  return {
    modalOpen: state.modalOpen,
  };
};

const mapDispatchToProps = {
  setModalOpen,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
