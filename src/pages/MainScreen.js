import React from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import ContactsListModal from "../components/ContactsListModal";

const MainScreen = () => {
  return (
    <div className="main-screen">
      <div className="centered-buttons">
        <ContactsListModal type="A" />
        <Button className="all-contacts-btn">Button A</Button>
        <Button variant="primary">Button B</Button>
      </div>
    </div>
  );
};

export default MainScreen;
