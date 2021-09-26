import React, { useState } from "react";
import { TableCell, TableRow } from "semantic-ui-react";

function Event({
  event: {
    title = "",
    description = "",
    begin = new Date(),
    finish = new Date(),
    owner,
    guests = [],
  },
}) {
  return (
    <TableRow>
      <TableCell>
        {begin.toLocaleDateString("pt-br") + finish.toLocaleDateString("pt-br")}
      </TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>{description}</TableCell>
    </TableRow>
  );
}

export default Event;
