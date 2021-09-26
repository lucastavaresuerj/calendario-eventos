import React from "react";
import { Grid } from "semantic-ui-react";

import { Day } from "../";

function DaysWrapper({ days = [] }) {
  return (
    <Grid className="days-wrapper">
      {days.map((events) => {
        console.log(events);
        return <Day className="days" events={events} />;
      })}
    </Grid>
  );
}

export default DaysWrapper;
