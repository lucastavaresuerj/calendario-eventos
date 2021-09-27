import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { DateObject } from "react-multi-date-picker";

import "./style.scss";
import calendar from "src/api/calendar";
import { Page, Header, DaysWrapper, Month } from "src/components";

function WebCalendar() {
  const [day, setDay] = useState(new DateObject());
  const [days, setDays] = useState([]);

  useEffect(() => {
    getDays();
  }, []);

  function setNewDate(date = new Date()) {
    setDay(new DateObject(date));
    getDays(date instanceof DateObject ? date.toDate() : date);
  }

  async function getDays(beginDay = new Date()) {
    try {
      const { data } = await calendar.get("/day", {
        params: {
          beginDay,
        },
      });
      console.log(data);
      setDays(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Page title="Calendario">
      <Header setDay={setNewDate} />
      <Grid celled className="main">
        <Grid.Row>
          <Grid.Column width="3">
            <Month setDay={setNewDate} day={day} />
          </Grid.Column>
          <Grid.Column width="13">
            <DaysWrapper days={days} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Page>
  );
}

export default WebCalendar;
