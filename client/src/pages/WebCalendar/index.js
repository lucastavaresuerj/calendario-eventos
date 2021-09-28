import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { DateObject } from "react-multi-date-picker";

import "./style.scss";
import calendar from "src/api/calendar";
import {
  Page,
  Header,
  DaysWrapper,
  Month,
  CreateButton,
  CreateEventForm,
} from "src/components";

function WebCalendar() {
  const [day, setDay] = useState(new DateObject());
  const [days, setDays] = useState([]);
  const [open, setOpen] = useState(false);

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
          <Grid.Column className="left-column" width="3">
            <CreateButton onClick={() => setOpen(!open)} />
            <Month setDay={setNewDate} day={day} />
          </Grid.Column>
          <Grid.Column className="right-column" width="13">
            <DaysWrapper days={days} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <CreateEventForm date={day} open={open} setOpen={setOpen} />
    </Page>
  );
}

export default WebCalendar;
