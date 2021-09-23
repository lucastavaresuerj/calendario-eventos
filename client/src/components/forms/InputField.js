import { useState, useRef, forwardRef, useEffect } from "react";
import { Form, Input, Icon, Label } from "semantic-ui-react";

export default InputField;

function InputField({
  error,
  label,
  isPassword,
  type = "text",
  disable,
  onChange,
  ...input
}) {
  const [isVisible, setIsVisible] = useState(false);

  function renderIconPassword() {
    return (
      <Icon
        name={isVisible ? "eye slash" : "eye"}
        link
        onClick={(e) => {
          setIsVisible(!isVisible);
        }}
      />
    );
  }

  return (
    <Form.Field error={!!error} disabled={disable}>
      <label className="label-input">{label}</label>
      {error && (
        <Label basic color="red" pointing="below">
          {error}
        </Label>
      )}
      <Input
        icon={type == "password" && renderIconPassword()}
        type={type == "password" ? (isVisible ? "text" : "password") : type}
        {...input}
        onChange={(e) => {
          onChange && onChange(e);
        }}
      />
    </Form.Field>
  );
}
