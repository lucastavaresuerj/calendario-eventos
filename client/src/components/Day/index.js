import React from "react";
import { Grid } from "semantic-ui-react";

import { EventsWrapper } from "../";

function Day({ events, day = new Date() }) {
  return (
    <Grid.Row className="days-grid-row">
      <Grid.Column>{day.toLocaleDateString("pt-br")}</Grid.Column>
      <Grid.Column>
        <EventsWrapper events={events} />
      </Grid.Column>
    </Grid.Row>
  );
}

export default Day;
