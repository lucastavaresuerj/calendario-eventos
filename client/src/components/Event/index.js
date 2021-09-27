import React, { useState } from "react";
import { TableCell, TableRow } from "semantic-ui-react";

import "./style.scss";

function Event({
  event: {
    title = "",
    description = "",
    begin = "",
    finish = "",
    owner,
    guests = [],
  },
  event,
}) {
  const [dateFormated, setDateFormated] = useState(formatDate());

  console.log(event);

  function formatDate() {
    const options = { hour12: true, hour: "numeric", minute: "2-digit" };

    const beginDate = new Date(begin).toLocaleTimeString("pt-BR", options);
    const finishDate = new Date(finish).toLocaleTimeString("pt-BR", options);

    const concat = `${beginDate} — ${finishDate}`;
    return concat
      .toLowerCase()
      .replace(/\s(.m)/gi, "$1")
      .replace(/(.*?)(.m) — (.*?)(.m)/gi, (math, p1, p2, p3, p4) => {
        if (p2 == p4) {
          return `${p1} — ${p3}${p2}`;
        }
        return math;
      });
  }

  return (
    <TableRow className="event-row">
      <TableCell>{dateFormated}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>{description}</TableCell>
    </TableRow>
  );
}

export default Event;
