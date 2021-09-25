import React from "react";

import { Day } from "../";

function DaysWrapper({ days }) {
  return days.map((events) => <Day event={events} />);
}

export default DaysWrapper;
