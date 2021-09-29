import React, { useState, useContext } from "react";
import { TableCell, TableRow, Icon } from "semantic-ui-react";

import "./style.scss";
import { EventContext } from "src/context/Event";

function Event({
  event: { title = "", description = "", begin = "", finish = "" },
  event,
}) {
  const [dateFormated] = useState(formatDate());
  const eventContext = useContext(EventContext);

  function formatDate() {
    const options = { hour12: true, hour: "numeric", minute: "2-digit" };

    const beginDate = new Date(begin).toLocaleTimeString("pt-BR", options);
    const finishDate = new Date(finish).toLocaleTimeString("pt-BR", options);

    const concat = `${beginDate} — ${finishDate}`;
    return concat
      .toLowerCase()
      .replace(/\s(.m)/gi, "$1")
      .replace(/(.*?)(.m) — (.*?)(.m)/gi, (math, p1, p2, p3, p4) => {
        if (p2 === p4) {
          return `${p1} — ${p3}${p2}`;
        }
        return math;
      });
  }

  function setContextEvent(e, { name }) {
    eventContext.setEvent({
      ...event,
      date: new Date(begin).setHours(0, 0, 0),
      option: name === "edit" ? "edit" : "delete",
    });
  }

  return (
    <TableRow className="event-row">
      <TableCell width="1">
        <Icon link name="edit" onClick={setContextEvent} />
        <Icon link name="trash" onClick={setContextEvent} />
      </TableCell>
      <TableCell width="2">{dateFormated}</TableCell>
      <TableCell width="4">{title}</TableCell>
      <TableCell className="description">{description}</TableCell>
    </TableRow>
  );
}

export default Event;
