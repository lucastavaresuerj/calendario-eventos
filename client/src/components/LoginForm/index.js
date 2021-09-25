import { useState, useContext } from "react";
import { Form, Button, Message } from "semantic-ui-react";

import { UserContext } from "src/context/User.js";
import { InputField } from "../";
import history from "src/history";

function LoginForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const error = {
    name: useStateError("O nome de usuário deve ser preenchido"),
    password: useStateError("A senha deve ser preenchida"),
  };

  const { login } = useContext(UserContext);

  function useStateError(alert, value = false) {
    const [error, setError] = useState(value);
    return {
      alert,
      error,
      setError: (error) => {
        setError(error);
        if (error)
          setTimeout(() => {
            setError(!error);
          }, 5000);
      },
    };
  }

  async function callLogin() {
    try {
      await login({ name, password });
      setLoading(false);
      history.push("/");
    } catch (e) {
      setLoading(false);
      setErrorMessage(e.message);
    }
  }

  function handleSubmit() {
    const formValues = {};

    if (name) {
      formValues.name = name;
      error.name.setError(false);
    } else {
      error.name.setError(true);
    }

    if (password) {
      formValues.password = password;
      error.password.setError(false);
    } else {
      error.password.setError(true);
    }

    if (!formValues.name || !formValues.password) {
      return;
    }

    setErrorMessage("");
    setLoading(true);
    callLogin();
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
          error={error.name.error && error.name.alert}
        />
        <InputField
          type="password"
          onChange={({ target: { value } }) => setPassword(value)}
          value={password}
          label="Senha de usuário"
          placeholder="senha"
          autoComplete="current-password"
          error={error.password.error && error.password.alert}
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
