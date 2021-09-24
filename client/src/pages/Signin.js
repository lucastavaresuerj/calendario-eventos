import React from "react";
import { Grid, Message, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import Page from "../components/Page";
import SigninForm from "../components/SigninForm";

function Signin() {
  return (
    <Page title="Calendario | Login" restricted={false}>
      <Grid stackable centered style={{ height: "93.5vh" }}>
        <Grid.Column verticalAlign="middle" className="login-form" width={4}>
          <Message attached header="Calendário de eventos" />
          <SigninForm />
          <Message attached="bottom" warning>
            <Icon name="help" />
            Já possui cadastro? <Link to="/login">Faça login aqui</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </Page>
  );
}

export default Signin;
