import React from "react";
import Modal from "react-bootstrap/Modal";

const ContactDetailedModal = ({ showDetailedModal, closeDetailedModal }) => {
  return (
    <Modal show={showDetailedModal} onHide={closeDetailedModal} size="lg">
      <Modal.Header>Detailed View</Modal.Header>
      <Modal.Body>This is detailed view of previous modal</Modal.Body>
    </Modal>
  );
};

export default ContactDetailedModal;
