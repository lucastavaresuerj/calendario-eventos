import React, { useState, useEffect, useContext } from "react";
import { Grid } from "semantic-ui-react";
import { DateObject } from "react-multi-date-picker";

import "./style.scss";
import calendar from "src/api/calendar";
import { EventContext } from "src/context/Event";
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
  const [edit, setEdit] = useState(false);

  const eventContext = useContext(EventContext);

  useEffect(() => {
    if (!eventContext.isEmpty() && eventContext.getEventOption() === "edit") {
      setOpen(true);
      setEdit(true);
    }
  }, [eventContext]);

  useEffect(() => {
    if (!open) {
      setEdit(false);
    }
  }, [open]);

  useEffect(() => {
    getDays();
  }, []);

  function setNewDate(date = new Date()) {
    const dateObject = new DateObject(date);
    setDay(dateObject);
    getDays(dateObject.toDate());
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

  async function onSubmit(eventFields) {
    try {
      if (edit) {
        await calendar.put(
          `/event/${eventContext.getEvent()["_id"]}`,
          eventFields
        );
      } else {
        await calendar.post("/event", eventFields);
      }

      getDays(day.toDate());
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Page title="Calendario">
      <Header setDay={setNewDate} day={day} />
      <Grid celled className="main">
        <Grid.Row centered>
          <Grid.Column className="left-column" width="3">
            <CreateButton onClick={() => setOpen(!open)} />
            <Month setDay={setNewDate} day={day} />
          </Grid.Column>
          <Grid.Column className="right-column" width="13">
            <DaysWrapper days={days} reloadDays={getDays} setDay={setNewDate} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {open && (
        <CreateEventForm
          date={day}
          open={open}
          edit={edit}
          setOpen={setOpen}
          onSubmit={onSubmit}
        />
      )}
    </Page>
  );
}

export default WebCalendar;
