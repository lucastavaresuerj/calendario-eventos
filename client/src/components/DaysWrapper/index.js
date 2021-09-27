import React, { useEffect, useState } from "react";
import { Grid, Message } from "semantic-ui-react";

import { Day } from "../";

function DaysWrapper({ days = {} }) {
  const [daysFormated, setDaysFormated] = useState([]);

  useEffect(() => {
    formatDays();
  }, [days]);

  function sortDays(dayA, dayB) {
    const dateDayA = new Date(dayA);
    const dateDayB = new Date(dayB);
    if (dateDayA < dateDayB) {
      return -1;
    }
    if (dateDayA > dateDayB) {
      return 1;
    }
    return 0;
  }

  function formatDays() {
    setDaysFormated(
      Object.keys(days)
        .sort(sortDays)
        .map((dayKey) => ({ day: new Date(dayKey), events: days[dayKey] }))
    );
  }

  console.log("daysFormated", daysFormated);

  return (
    <Grid className="days-wrapper" celled>
      {daysFormated.length ? (
        daysFormated.map(({ day, events }, index) => {
          return <Day key={`day-index-${index}`} {...{ day, events }} />;
        })
      ) : (
        <Message
          icon="inbox"
          header="Você não tem mais eventos para os próximos dias."
        />
      )}
    </Grid>
  );
}

export default DaysWrapper;
