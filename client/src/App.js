import "./App.css";
import "semantic-ui-css/semantic.min.css";

import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import UserProvider from "./context/User";
import EventProvider from "./context/Event";
import history from "./history";
import { Login, Signin, WebCalendar } from "./pages";

function App() {
  return (
    <UserProvider>
      <Router history={history}>
        <div>
          <Switch>
            <Route path="/" exact>
              <EventProvider>
                <WebCalendar />
              </EventProvider>
            </Route>
            <Route path="/signin" component={Signin} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
