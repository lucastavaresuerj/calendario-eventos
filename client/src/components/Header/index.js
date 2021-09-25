import React from "react";
import { Grid } from "semantic-ui-react";

import "./style.scss";
import { TodayButton } from "../";

function Header() {
  return (
    <Grid className="test-class">
      <Grid.Row>
        <TodayButton />
      </Grid.Row>
    </Grid>
  );
}

export default Header;
