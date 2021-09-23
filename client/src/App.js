import "./App.css";
import "semantic-ui-css/semantic.min.css";

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import UserProvider from "./context/user";
import { Login, Signin, WebCalendar } from "./pages";

function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={WebCalendar} />
            <Route path="/signin" component={Signin} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
