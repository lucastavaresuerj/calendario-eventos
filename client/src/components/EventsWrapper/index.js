import React from "react";
import { Table } from "semantic-ui-react";

import { Event } from "../";

function EventsWrapper({ events = [] }) {
  return (
    <Table>
      <Table.Body>
        {events.map((event) => (
          <Event event={event} />
        ))}
      </Table.Body>
    </Table>
  );
}

export default EventsWrapper;
