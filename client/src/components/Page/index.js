import { useEffect, useContext } from "react";

import history from "src/history";
import { UserContext } from "src/context/User.js";

function Page({ title = "Calendario", restricted = true, children }) {
  const { user } = useContext(UserContext);

  useEffect(() => {
    document.title = title;
  }, [title]);

  if (restricted && !user) {
    history.replace("/login");
  }

  return children;
}

export default Page;
