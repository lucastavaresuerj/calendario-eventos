const { GET, POST, PATCH, DELETE } = require("./types");
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

  Object.keys(event).forEach(
    (k) => (event[k] === null || event[k] === undefined) && delete event[k]
  );

  return event;
}

router.all("/", async (req, res, next) => {
  const {
    owner,
    title = "",
    description = "",
    begin = new Date(),
    finish = new Date(),
    guests = [],
  } = req.body;
  switch (req.method) {
    case GET:
      try {
        const events = await Event.find({ owner }).limit(20).exec();
        res.status(200).send(events);
      } catch (error) {
        res.status(404).send();
      }
      break;
    case POST:
      try {
        const event = await Event.create(
          await makeEventAttributes(
            owner,
            title,
            description,
            begin,
            finish,
            guests
          )
        );
        res.status(200).send(event);
      } catch (error) {
        res.status(500).send();
      }
      break;
    default:
      res.status(405).send();
  }
});

router.all("/:event_id", async (req, res, next) => {
  const eventId = req.params.event_id;
  const { owner } = req.body;
  switch (req.method) {
    case GET:
      try {
        const event = await Event.findOne({ _id: eventId, owner }).exec();
        res.status(200).send(event);
      } catch (error) {
        res.status(404);
      }
      break;
    case PATCH:
      try {
        const event = await Event.findOneAndUpdate(
          { _id: eventId, owner },
          await makeEventAttributes(req.body),
          { omitUndefined: true }
        ).exec();
        res.status(200).send(event);
      } catch (error) {
        res.status(404);
      }
      break;
    case DELETE:
      try {
        await Event.findOneAndDelete({ _id: eventId, owner }).exec();
        res.status(200).send({ message: `Evento de id ${eventId} deletado` });
      } catch (error) {
        res.status(404);
      }
      break;
    default:
      res.status(405);
  }
  next();
});

module.exports = router;
