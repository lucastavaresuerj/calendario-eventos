import React from "react";

function NavDaysButton({ next = false, previous = false }) {
  const direction = next ? "next" : previous ? "previous" : "unknow";

  return <div>{direction}</div>;
}

export default NavDaysButton;
