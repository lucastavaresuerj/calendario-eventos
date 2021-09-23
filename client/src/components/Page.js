import React, { useEffect } from "react";

function Page({ title = "Calendario", restricted = true, children }) {
  useEffect(() => {
    document.title = title;
  }, []);
  return <div>{children}</div>;
}

export default Page;
