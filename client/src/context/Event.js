import { createContext, useState } from "react";
import { DateObject } from "react-multi-date-picker";

export const EventContext = createContext({
  getEvent: () => {},
  getEventOption: () => {},
  setEvent: () => {},
  cleanEvent: () => {},
  isEmpty: () => {},
});

export default function EventProvider({ children }) {
  const [event, setEventState] = useState(null);

  function getEvent() {
    if (!event) {
      return {
        title: "",
        description: "",
        begin: new DateObject(),
        finish: new DateObject().add(1, "hour"),
      };
    }
    return event;
  }

  function setEvent({ begin, finish, date, ...event }) {
    setEventState({
      ...event,
      begin: new DateObject(begin),
      finish: new DateObject(finish),
      date: new DateObject(date),
    });
  }

  function cleanEvent() {
    setEventState(null);
    console.log("clean");
  }
  function isEmpty() {
    return event == null;
  }

  function getEventOption() {
    return event?.option;
  }

  return (
    <EventContext.Provider
      value={{ getEvent, cleanEvent, setEvent, isEmpty, getEventOption }}
    >
      {children}
    </EventContext.Provider>
  );
}
