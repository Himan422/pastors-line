import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { getContactData } from "../apis/contactData";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ContactDetailedModal from "./ContactDetailedModal";

const ContactsListModal = ({ type }) => {
  const [showModal, setShowModal] = useState(true);
  const [onlyEven, setOnlyEven] = useState(false);
  const [contactData, setContactData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showDetailedModal, setShowDetailedModal] = useState(true);
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getContactData({
      query: searchText,
      page: 1,
      countryId: type === "B" ? "226" : "",
    });
    setContactData(Object.values(data.contacts));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    history.push("/");
  };

  const closeDetailedModal = () => {
    setShowDetailedModal(false);
    setShowModal(true);
  };

  const handleCheckboxChange = () => {
    setOnlyEven(!onlyEven);
  };

  const openDetailedModal = () => {
    setShowModal(false);
    setShowDetailedModal(true);
  };

  return (
    <>
      <ContactDetailedModal
        showDetailedModal={showDetailedModal}
        closeDetailedModal={closeDetailedModal}
      />
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title> Modal {type}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {contactData.map((item) => (
                  <tr key={item.id} onClick={() => openDetailedModal()}>
                    <td>{item.id}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone_number}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

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
    </>
  );
};

export default ContactsListModal;
