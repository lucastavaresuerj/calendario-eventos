import React from "react";
import { Button } from "semantic-ui-react";

import "./style.scss";

function CreateButton(props) {
  return (
    <div className="create-event-button">
      <Button primary {...props}>
        Adicionar Evento
      </Button>
    </div>
  );
}

export default CreateButton;
