import React from "react";
import { Grid } from "semantic-ui-react";

import "./style.scss";
import { TodayButton, NavDaysButton, UserMenu } from "../";
import { DateObject } from "react-multi-date-picker";

function Header({ setDay, day }) {
  return (
    <Grid className="header-app">
      <Grid.Row>
        <Grid.Column floated="right" width="13">
          <TodayButton {...{ setDay }} />
          <NavDaysButton
            previous
            onClick={() => setDay(new DateObject(day).subtract(1, "day"))}
          />
          <NavDaysButton
            next
            onClick={() => setDay(new DateObject(day).add(1, "day"))}
          />
        </Grid.Column>
        <Grid.Column width="2">
          <UserMenu />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Header;
