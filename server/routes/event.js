const { GET, POST, DELETE, PUT } = require("./types");
const Event = require("../models/Event");
const User = require("../models/User");

const router = require("express").Router();

async function makeEventAttributes({
  title,
  description,
  begin,
  finish,
  owner,
  guests,
}) {
  const event = {
    title,
    description,
    begin,
    finish,
    owner: await User.findById(owner),
    guests: await Promise.all(
      guests?.map(async (guest) => await User.findById(guest))
    ),
  };

  return event;
}

function makeOptions({ title, description, begin, finish }) {
  const options = {};
  if (title) options.title = { $text: title };
  if (description) options.description = { $text: description };
  if (begin) options.begin = { $gte: new Date(begin) };
  if (finish) options.finish = { $lte: new Date(finish) };

  return options;
}

router.all("/", async (req, res, next) => {
  const { owner } = req.headers;
  const {
    title = "",
    description = "",
    begin = new Date(),
    finish = new Date(),
    guests = [],
  } = req.body;

  const options = makeOptions(req.query);

  switch (req.method) {
    case GET:
      try {
        const events = await Event.find({ owner, ...options })
          .limit(20)
          .exec();
        res.status(200).send(events);
      } catch (error) {
        res.status(404).send();
      }
      break;
    case POST:
      try {
        const event = await Event.create(
          await makeEventAttributes({
            owner,
            title,
            description,
            begin,
            finish,
            guests,
          })
        );
        res.status(200).send(event);
      } catch (error) {
        res.status(500).send(error.message);
      }
      break;
    default:
      res.status(405).send();
  }
});

router.all("/:event_id", async (req, res, next) => {
  const { owner } = req.headers;
  const eventId = req.params.event_id;
  const {
    title = "",
    description = "",
    begin = new Date(),
    finish = new Date(),
    guests = [],
  } = req.body;

  switch (req.method) {
    case GET:
      try {
        const event = await Event.findOne({ _id: eventId, owner }).exec();
        res.status(200).send(event);
      } catch (error) {
        res.status(404);
      }
      break;
    case PUT:
      try {
        const event = await Event.findOneAndUpdate(
          { _id: eventId, owner },
          await makeEventAttributes({
            owner,
            title,
            description,
            begin,
            finish,
            guests,
          }),
          { omitUndefined: true }
        ).exec();
        res.status(200).send(event);
      } catch (error) {
        res.status(404).send("Não encontrado");
      }
      break;
    case DELETE:
      try {
        await Event.findOneAndDelete({ _id: eventId, owner }).exec();
        res.status(200).send({ message: `Evento de id ${eventId} deletado` });
      } catch (error) {
        res.status(404).send("Não encontrado");
      }
      break;
    default:
      res.status(405).send();
  }
});

module.exports = router;
