import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { DateObject } from "react-multi-date-picker";

import calendar from "src/api/calendar";
import { Page, Header, DaysWrapper, Month } from "src/components";

function WebCalendar() {
  const [day, setDay] = useState(new DateObject());
  const [days, setDays] = useState([]);

  useEffect(() => {
    getDays();
  }, []);

  async function getDays() {
    try {
      const { data } = await calendar.get("/day");
      console.log(data);
      setDays(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Page title="Calendario" />
      <Header />
      <Grid>
        <Grid.Row>
          <Grid.Column width="3">
            <Month />
          </Grid.Column>
          <Grid.Column width="13">
            <DaysWrapper days={days} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default WebCalendar;
