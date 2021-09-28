import React, { useEffect, useRef, useState } from "react";
import { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import {
  Form,
  Input,
  TextArea,
  Portal,
  Message,
  Icon,
  Button,
} from "semantic-ui-react";

import "./style.scss";
import { InputDate } from "../";

function CreateEventForm({ date = new Date(), open, setOpen }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState(new DateObject(date));

  const [startHour, setStartHour] = useState(new DateObject());
  const [endHour, setEndHour] = useState(new DateObject().add(1, "hour"));

  const [errorMessage, setErrorMessage] = useState("");
  const [timeoutErrorMessage, setTimeoutErrorMessage] = useState(0);

  const [formPosition, setFormPosition] = useState({
    clientX: 0,
    clientY: 0,
    offsetLeft: 0,
    offsetTop: 0,
  });

  const formRef = useRef();

  useEffect(() => {
    return () => clearTimeout(timeoutErrorMessage);
  }, []);

  function handleDragStart({ clientX, clientY }) {
    const { offsetLeft, offsetTop } = formRef.current;
    console.log({ offsetLeft, offsetTop, clientX, clientY });
    setFormPosition({ offsetLeft, offsetTop, clientX, clientY });
  }

  function handleDrag({ clientX, clientY }) {
    const { offsetLeft, offsetTop } = formPosition;
    const { current } = formRef;
    current.style.top = `${offsetTop + (clientY - formPosition.clientY)}px`;
    current.style.left = `${offsetLeft + (clientX - formPosition.clientX)}px`;
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleSubmit() {
    setTimeoutErrorMessage(setTimeout(() => setErrorMessage(""), 5000));
    if (!title) {
      setErrorMessage("O evento precisa de um título");
      return;
    }
    if (!startHour.isValid || !endHour.isValid) {
      setErrorMessage("Os horários dos eventos precisam ter o formato correto");
      return;
    }
  }

  return (
    <Portal open={open}>
      <div className="event-form boxshadow" ref={formRef}>
        <Message
          icon
          attached
          draggable
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragOver={handleDragOver}
        >
          <Message.Content>
            <Message.Header>Adicionar Evento</Message.Header>
          </Message.Content>
          <Icon name="close" onClick={() => setOpen(false)} />
        </Message>
        <Form
          className="attached fluid segment"
          onSubmit={handleSubmit}
          unstackable
        >
          <Form.Field>
            <Input
              fluid
              value={title}
              onChange={(e, { value }) => setTitle(value)}
              placeholder="Adicionar Titulo"
            />
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Field>
              <InputDate
                disableDayPicker
                format="HH:mm"
                value={startHour}
                onChange={setStartHour}
                plugins={[<TimePicker hideSeconds />]}
              />
            </Form.Field>
            <Form.Field>
              <InputDate
                disableDayPicker
                format="HH:mm"
                value={endHour}
                onChange={setEndHour}
                plugins={[<TimePicker hideSeconds />]}
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <TextArea
              value={description}
              onChange={(e, { value }) => setDescription(value)}
              placeholder="Adicionar Descrição"
            />
          </Form.Field>
          <Form.Group>
            <Form.Field width="4">
              <Button floated="left" primary>
                Criar
              </Button>
            </Form.Field>
            <Form.Field width="12">
              <InputDate
                value={eventDate}
                onChange={setEventDate}
                basicFormat
              />
            </Form.Field>
          </Form.Group>
        </Form>
        <Message
          attached="bottom"
          error={!!errorMessage}
          visible={!!errorMessage}
          content={errorMessage}
        />
      </div>
    </Portal>
  );
}

export default CreateEventForm;
