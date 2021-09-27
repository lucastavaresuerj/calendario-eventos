import React from "react";
import { Table } from "semantic-ui-react";

import { Event } from "../";

function EventsWrapper({ events = [] }) {
  return (
    <Table basic="very" className="event-table">
      <Table.Body>
        {events.map((event, index) => (
          <Event key={`event-index-${index}`} event={event} />
        ))}
      </Table.Body>
    </Table>
  );
}

export default EventsWrapper;
