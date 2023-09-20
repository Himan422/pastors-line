import React from "react";
import MainScreen from "./pages/MainScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ContactsListModal from "./components/ContactsListModal";
import "./assets/css/index.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/all-contacts-list">
            <ContactsListModal type="A"/>
          </Route>
          <Route path="/us-contacts-list">
            <ContactsListModal type="B"/>
          </Route>
          <Route path="/">
            <MainScreen />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
