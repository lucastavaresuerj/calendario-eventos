import { useState, useContext } from "react";
import { Form, Button, Message } from "semantic-ui-react";

import { UserContext } from "../context/User.js";
import { InputField } from "./forms/index.js";
import history from "../history";

function SigninForm() {
  const { signin } = useContext(UserContext);

  const error = {
    name: useStateError("O nome de usuário deve ser preenchido"),
    password: useStateError("As senhas devem ser preenchidas e iguáis"),
  };

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  async function callSignin() {
    try {
      await signin({ name, password });
      history.push("/");
    } catch (e) {
      setErrorMessage(e.message);
    }
    setLoading(false);
  }

  function handleSubmit() {
    const formValues = {};

    if (name) {
      formValues.name = name;
      error.name.setError(false);
    } else {
      error.name.setError(true);
    }

    if (password === repPassword && password) {
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
    callSignin();
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
          error={error.password.error && error.password.alert}
        />
        <InputField
          type="password"
          onChange={({ target: { value } }) => setRepPassword(value)}
          value={repPassword}
          label="Repetir a senha de usuário"
          placeholder="mesma senha"
          error={error.password.error && error.password.alert}
        />
        <Button>Cadastrar</Button>
      </Form>
      <Message
        attached
        hidden={!errorMessage}
        error
        header="Erro ao cadastrar"
        content={errorMessage}
      />
    </>
  );
}

export default SigninForm;
