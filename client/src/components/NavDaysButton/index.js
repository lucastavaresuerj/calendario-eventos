import React from "react";
import { Icon } from "semantic-ui-react";

function NavDaysButton({ next = false, previous = false, ...props }) {
  const direction = next ? "angle right" : previous ? "angle left" : "unknow";

  return <Icon link name={direction} size="big" {...props} />;
}

export default NavDaysButton;
