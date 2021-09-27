import React from "react";

import "./style.scss";
import { LocaleCalendar } from "../";

function Month({ setDay, day }) {
  return (
    <div className="main-calendar-piker">
      <LocaleCalendar onChange={setDay} value={day} />
    </div>
  );
}

export default Month;
