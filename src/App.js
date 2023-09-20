import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./assets/css/index.css";
import ContactsListModal from "./components/ContactsListModal";
import MainScreen from "./pages/MainScreen";

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
