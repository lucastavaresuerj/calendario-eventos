import React, { useEffect, useRef, useState, useContext } from "react";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { DateObject } from "react-multi-date-picker";
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
import { EventContext } from "src/context/Event";

function CreateEventForm({ open, setOpen, onSubmit, edit, date }) {
  const eventContext = useContext(EventContext);

  const event = eventContext.getEvent();

  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [eventDate, setEventDate] = useState(event.date || date);

  const [startHour, setStartHour] = useState(event.begin);
  const [endHour, setEndHour] = useState(event.finish);

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
  }, [timeoutErrorMessage]);

  function handleDragStart({ clientX, clientY }) {
    const { offsetLeft, offsetTop } = formRef.current;

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

  function handleClose() {
    eventContext.cleanEvent();
    setOpen(false);
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

    if (!eventDate.isValid) {
      setErrorMessage("O dia do evento precisa ter o formato correto");
      return;
    }
    onSubmit({
      title,
      description,
      begin: new DateObject(eventDate).setHour(startHour.hour),
      finish: new DateObject(eventDate).setHour(endHour.hour),
    });
    setOpen(false);
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
            <Message.Header>
              {edit ? "Editar" : "Adicionar"} Evento
            </Message.Header>
          </Message.Content>
          <Icon name="close" onClick={handleClose} />
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
                {edit ? "Editar" : "Criar"}
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
