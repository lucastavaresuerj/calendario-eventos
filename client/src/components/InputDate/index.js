import { Form, Icon } from "semantic-ui-react";
import { LocaleDatePicker } from "../";

function RenderCalendarInput({ openCalendar, value, placeholder, formatter }) {
  value = formatter
    ? formatter(typeof value != "string" ? value.toString() : value)
    : value;
  return (
    <Form.Input
      fluid
      {...{ placeholder, value }}
      icon={<Icon name="calendar outline" link onClick={openCalendar} />}
    />
  );
}

function InputDate({ label, placeholder, formatter, style, ...props }) {
  return (
    <Form.Field>
      {label && <label className="label-input">{label}</label>}
      <LocaleDatePicker
        {...props}
        containerStyle={{ display: "unset" }}
        render={<RenderCalendarInput {...{ placeholder, formatter }} />}
      />
    </Form.Field>
  );
}

export default InputDate;
