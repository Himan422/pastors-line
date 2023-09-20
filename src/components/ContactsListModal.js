import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { getContactData } from "../apis/contactData";

const ContactsListModal = ({ type }) => {
  const [showModal, setShowModal] = useState(false);
  const [onlyEven, setOnlyEven] = useState(false);

  useEffect(() => {
    getContactData().then(console.log);
  }, []);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleCheckboxChange = () => {
    setOnlyEven(!onlyEven);
  };

  return (
    <Modal show={true} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title> Modal {type}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button className="all-contacts-btn">All Contacts</Button>
        <Button className="us-contacts-btn">US Contacts</Button>
        <Button className="cls-modal-btn" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Form.Check
          type="checkbox"
          id="checkboxA"
          label="Only even"
          checked={onlyEven}
          onChange={handleCheckboxChange}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ContactsListModal;
