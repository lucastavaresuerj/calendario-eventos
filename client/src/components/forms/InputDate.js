import { Form, Input, Icon } from "semantic-ui-react";
import DatePicker, { DateObject } from "react-multi-date-picker";

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

function InputDate({ label, placeholder, setter, formatter, style, ...props }) {
  return (
    <Form.Field>
      <label className="label-input">{label}</label>
      <DatePicker
        {...props}
        onChange={setter}
        containerStyle={{ display: "unset" }}
        render={<RenderCalendarInput {...{ placeholder, formatter }} />}
      />
    </Form.Field>
  );
}

export default InputDate;
