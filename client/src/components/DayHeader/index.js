import React from "react";
import { useState } from "react/cjs/react.development";
import { Label } from "semantic-ui-react";

import "./style.scss";

function DayHeader({ day = new Date() }) {
  const [isDayToday, setIsDayToday] = useState(
    day.setHours(0, 0, 0) == new Date().setHours(0, 0, 0)
  );

  function formatMonthWeek() {
    const options = { weekday: "short", month: "short" };
    return day
      .toLocaleDateString("pt-BR", options)
      .replace(
        /(.*?)\. (.*?)\./gi,
        (math, p1, p2) => `${p1.toUpperCase()}, ${p2.toUpperCase()}`
      );
  }

  return (
    <div className={`day-header ${isDayToday ? "today" : ""}`}>
      {isDayToday ? (
        <Label circular color="blue">
          {day.getDate()}
        </Label>
      ) : (
        <div className="day-date">{day.getDate()}</div>
      )}{" "}
      <div className="day-month-week">{formatMonthWeek()}</div>
    </div>
  );
}

export default DayHeader;
