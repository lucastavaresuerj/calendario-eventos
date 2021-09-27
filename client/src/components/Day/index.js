import React from "react";
import { Grid } from "semantic-ui-react";

import { EventsWrapper } from "../";

function Day({ day = new Date(), events = [] }) {
  console.log(day);

  function formatMonthWeek() {
    const options = { weekday: "short", month: "short" };
    return day
      .toLocaleDateString("pt-BR", options)
      .replace(
        /(.*?)\. (.*?)\./gi,
        (math, p1, p2) => `${p1.toUpperCase()}, ${p2.toUpperCase()}`
      );
  }

  return (
    <Grid.Row className="days-grid-row">
      <Grid.Column width={2}>
        <span className="day-date">{day.getDate()}</span>{" "}
        <span className="day-month-week">{formatMonthWeek()}</span>
      </Grid.Column>
      <Grid.Column width={14}>
        <EventsWrapper events={events} />
      </Grid.Column>
    </Grid.Row>
  );
}

export default Day;
