import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const MainScreen = () => {
  return (
    <div className="main-screen">
      <div className="centered-buttons">
        <Link className="btn all-contacts-btn" to="/all-contacts-list">
          Button A
        </Link>
        <Link className="btn us-contacts-btn" to="/us-contacts-list">
          Button B
        </Link>
      </div>
    </div>
  );
};

export default MainScreen;
