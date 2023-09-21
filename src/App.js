import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./assets/scss/index.scss";
import ContactsListModal from "./components/ContactsListModal";
import MainScreen from "./pages/MainScreen";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/all-contacts-list">
              <ContactsListModal type="A" />
            </Route>
            <Route path="/us-contacts-list">
              <ContactsListModal type="B" />
            </Route>
            <Route path="/">
              <MainScreen />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
