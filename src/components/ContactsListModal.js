import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Button,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Table,
} from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars";
import { useHistory, Link } from "react-router-dom";
import { getContactData } from "../apis/contactData";
import ContactDetailedModal from "./ContactDetailedModal";

let timeoutTime;
const ContactsListModal = ({ type }) => {
  const [showModal, setShowModal] = useState(true);
  const [onlyEven, setOnlyEven] = useState(false);
  const [contactData, setContactData] = useState([]);
  const [contactUpdatedData, setContactUpdatedData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPageData] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showDetailedModal, setShowDetailedModal] = useState(true);
  const scrollAbleData = useRef(null);
  const history = useHistory();

  const fetchData = useCallback(async () => {
    const data = await getContactData({
      query: searchText,
      page: 1,
      countryId: type === "B" ? "226" : "",
      setLoading,
    });
    setContactData(data.contacts ? Object.values(data.contacts) : []);
  }, [searchText, type]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (contactData.length) {
      setContactUpdatedData(
        contactData.filter((e) => (onlyEven ? !(e.id % 2) : true))
      );
    }
  }, [contactData, onlyEven]);

  useEffect(() => {
    scrollAbleData.current.scrollToTop();
  }, [onlyEven]);

  const loadMoreData = async () => {
    const data = await getContactData({
      query: searchText,
      page: page + 1,
      countryId: type === "B" ? "226" : "",
      setLoading,
    });
    setPageData(page + 1);
    setContactData((pre) =>
      pre.concat(data.contacts ? Object.values(data.contacts) : [])
    );
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

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    if (timeoutTime) clearTimeout(timeoutTime);
    timeoutTime = setTimeout(() => {
      scrollAbleData.current.scrollToTop();
      fetchData();
    }, 500);
  };

  const onHitEnter = (event) => {
    if (event.key === "Enter") {
      if (timeoutTime) clearTimeout(timeoutTime);
      fetchData();
      scrollAbleData.current.scrollToTop();
    }
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
        <Modal.Body style={{ position: "relative" }}>
          <div className="container">
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search contacts..."
                onChange={handleSearch}
                value={searchText}
                onKeyDown={onHitEnter}
              />
            </InputGroup>
          </div>
          {loading && (
            <div className="loading-screen">
              <div className="loader"></div>
            </div>
          )}
          <Scrollbars
            style={{ height: "calc(100vh - 330px)" }}
            ref={scrollAbleData}
            onScrollFrame={({ top }) => {
              if (top === 1) {
                loadMoreData();
              }
            }}
            hideTracksWhenNotNeeded
          >
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
              {!!contactUpdatedData.length &&
                contactUpdatedData.map((item) => (
                  <tbody>
                    <tr key={item.id} onClick={() => openDetailedModal()}>
                      <td>{item.id}</td>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone_number}</td>
                    </tr>
                  </tbody>
                ))}
            </Table>
            {!contactUpdatedData.length && (
              <div className="no-data-found"><h4>No data found</h4></div>
            )}
          </Scrollbars>
        </Modal.Body>
        <Modal.Footer>
          <Form.Check
            type="checkbox"
            id="checkboxA"
            label="Only even"
            checked={onlyEven}
            onChange={handleCheckboxChange}
          />
          <div>
            <Link className="btn all-contacts-btn" to="/all-contacts-list">
              All Contacts
            </Link>
            <Link className="btn us-contacts-btn" to="/us-contacts-list">
              US Contacts
            </Link>
            <Button className="cls-modal-btn" onClick={handleCloseModal}>
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ContactsListModal;
