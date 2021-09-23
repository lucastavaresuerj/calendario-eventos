import { useState, useContext } from "react";
import { Form, Button, Message } from "semantic-ui-react";

import { UserContext } from "../context/user.js";
import { InputField } from "./forms/index.js";

function LoginForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { REACT_APP_CALENDAR_API_ADDRESS } = process.env;

  console.log("api address", REACT_APP_CALENDAR_API_ADDRESS);

  const { login } = useContext(UserContext);

  async function handleSubmit() {
    setErrorMessage("");
    setLoading(true);
    if (name && password) {
      try {
        await login({ name, password });
      } catch (error) {
        console.log(error);
        setErrorMessage(error.message);
      }
      setLoading(false);
    }
  }

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        loading={loading}
        className="attached fluid segment"
      >
        <InputField
          type="text"
          onChange={({ target: { value } }) => setName(value)}
          value={name}
          label="Nome de usuário"
          placeholder="usuário"
          error={!!errorMessage}
        />
        <InputField
          type="password"
          onChange={({ target: { value } }) => setPassword(value)}
          value={password}
          label="Senha de usuário"
          placeholder="senha"
          autoComplete="current-password"
          error={!!errorMessage}
        />
        <Button>Login</Button>
      </Form>
      <Message
        attached
        hidden={!errorMessage}
        error
        header="Erro ao efetuar login"
        content={errorMessage}
      />
    </>
  );
}

export default LoginForm;
