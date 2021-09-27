import React from "react";
import { Grid, Message, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { Page, LoginForm } from "src/components";

function Login() {
  return (
    <Page title="Calendario | Login" restricted={false}>
      <Grid stackable centered style={{ height: "93.5vh" }}>
        <Grid.Column verticalAlign="middle" className="login-form" width={4}>
          <Message attached header="Calendário de eventos" />
          <LoginForm />
          <Message attached="bottom" warning>
            <Icon name="help" />
            Ainda não possui cadastro?{" "}
            <Link to="/signin">cadastre-se aqui</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </Page>
  );
}

export default Login;
