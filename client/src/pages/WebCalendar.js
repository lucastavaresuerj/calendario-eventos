import React, { useState } from "react";

import { Page, Header } from "../components";

function WebCalendar() {
  const [day, setDay] = useState(new Date());

  return (
    <Page title="Calendario" restricted>
      <Header />
    </Page>
  );
}

export default WebCalendar;
