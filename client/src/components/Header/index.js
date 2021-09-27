import React from "react";
import { Grid } from "semantic-ui-react";

import "./style.scss";
import { TodayButton, NavDaysButton } from "../";

function Header({ setDay }) {
  return (
    <Grid className="header-app">
      <Grid.Row>
        <TodayButton {...{ setDay }} />
        <NavDaysButton previous />
        <NavDaysButton next />
      </Grid.Row>
    </Grid>
  );
}

export default Header;
