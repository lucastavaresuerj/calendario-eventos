import React, { useEffect, useState } from "react";
import { Button, Popup } from "semantic-ui-react";

import "./style.scss";

function TodayButton({ setDay }) {
  const [today, setToday] = useState(new Date());
  var options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  };

  function editToday() {
    return setTimeout(() => setToday(new Date()), 1000);
  }

  function formatToday() {
    return today
      .toLocaleString("pt-BR", options)
      .replace(/(.{3})\./gi, (match, p1) => {
        return p1.toUpperCase();
      });
  }

  useEffect(() => {
    const todayTimeout = editToday();
    return () => clearTimeout(todayTimeout);
  }, [today]);

  return (
    <Popup
      trigger={
        <Button
          className="today-button"
          basic
          color="grey"
          onClick={() => setDay()}
        >
          TodayButton
        </Button>
      }
      content={formatToday()}
      inverted
    />
  );
}

export default TodayButton;
