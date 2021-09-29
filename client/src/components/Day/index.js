import React from "react";
import { Grid } from "semantic-ui-react";

import { EventsWrapper, DayHeader } from "../";

function Day({ day = new Date(), events = [], setDay }) {
  return (
    <Grid.Row className="days-grid-row">
      <Grid.Column width={2}>
        <DayHeader day={day} setDay={setDay} />
      </Grid.Column>
      <Grid.Column width={14}>
        <EventsWrapper events={events} />
      </Grid.Column>
    </Grid.Row>
  );
}

export default Day;
