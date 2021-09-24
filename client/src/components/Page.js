import React, { useEffect, useContext } from "react";
import history from "../history";

import { UserContext } from "../context/User.js";

function Page({ title = "Calendario", restricted = true, children }) {
  const { user } = useContext(UserContext);

  useEffect(() => {
    document.title = title;
  }, [title]);

  if (restricted && !user) {
    history.replace("/login");
  }

  return <div>{children}</div>;
}

export default Page;
