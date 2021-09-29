import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { Label } from "semantic-ui-react";

import "./style.scss";

function DayHeader({ day = new Date(), setDay }) {
  const [isDayToday, setIsDayToday] = useState(checkToday());

  useEffect(() => {
    setIsDayToday(checkToday());
  }, [day]);

  function checkToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return day.getTime() === today.getTime();
  }

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
    <div
      className={`day-header ${isDayToday ? "today" : ""}`}
      onClick={() => setDay(day)}
    >
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
