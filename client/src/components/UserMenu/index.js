import React, { useContext } from "react";
import { Dropdown } from "semantic-ui-react";

import "./style.scss";
import { UserContext } from "src/context/User";

function UserMenu() {
  const { logout } = useContext(UserContext);

  return (
    <Dropdown
      text={localStorage.getItem("ownerName")}
      pointing
      className="link item user-menu"
    >
      <Dropdown.Menu>
        <Dropdown.Item onClick={logout}>Sair</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserMenu;
