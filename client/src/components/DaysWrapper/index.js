import React, { useEffect, useState, useContext } from "react";
import { Grid, Message, Modal, Button } from "semantic-ui-react";

import calendar from "src/api/calendar";
import { EventContext } from "src/context/Event";
import { Day } from "../";

function DaysWrapper({ days = {}, reloadDays, setDay }) {
  const [daysFormated, setDaysFormated] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const eventContext = useContext(EventContext);

  useEffect(() => {
    formatDays();
  }, [days]);

  useEffect(() => {
    if (eventContext.getEventOption() === "delete") {
      setOpenModal(true);
    }
  }, [eventContext]);

  function sortDays(dayA, dayB) {
    const dateDayA = new Date(dayA);
    const dateDayB = new Date(dayB);
    if (dateDayA < dateDayB) {
      return -1;
    }
    if (dateDayA > dateDayB) {
      return 1;
    }
    return 0;
  }

  function formatDays() {
    setDaysFormated(
      Object.keys(days)
        .sort(sortDays)
        .map((dayKey) => ({
          day: new Date(`${dayKey}T00:00`),
          events: days[dayKey],
        }))
    );
  }

  return (
    <Grid className="days-wrapper" divided="vertically">
      {daysFormated.length ? (
        daysFormated.map(({ day, events }, index) => {
          return (
            <Day key={`day-index-${index}`} {...{ day, events, setDay }} />
          );
        })
      ) : (
        <Message
          icon="inbox"
          header="Você não tem mais eventos para os próximos 20 dias."
        />
      )}
      <Modal size="tiny" open={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Deletar Evento</Modal.Header>
        <Modal.Content>
          <p>Você tem certeza que deseja deletar esse evento?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setOpenModal(false)}>
            No
          </Button>
          <Button
            positive
            onClick={() => {
              calendar.delete(`/event/${eventContext.getEvent()["_id"]}`);
              reloadDays();
              setOpenModal(false);
            }}
          >
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </Grid>
  );
}

export default DaysWrapper;
