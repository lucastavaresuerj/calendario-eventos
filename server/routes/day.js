const Event = require("../models/Event");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  const { owner } = req.headers;
  const { beginDay } = req.query;

  const inicialDay = beginDay ? new Date(beginDay) : new Date();
  const finalDay = new Date(inicialDay);
  finalDay.setDate(inicialDay.getDate() + 20);

  console.log(inicialDay, finalDay);

  try {
    const days = await Event.find({
      owner,
      begin: { $gte: inicialDay, $lte: finalDay },
    }).exec();

    const groupByDate = days.reduce((byDate, event) => {
      const dayKey = event.begin.toISOString().split("T")[0];
      console.log(byDate);
      return {
        ...byDate,
        [dayKey]: byDate[dayKey] ? [...byDate[dayKey], event] : [event],
      };
    }, {});

    res.status(200).send(groupByDate);
  } catch (error) {
    console.log(error);
    res.status(404);
  }

  next();
});

router.get("/:day", async (req, res, next) => {
  const { owner } = req.headers;
  const { day } = req.params;

  const date = new Date(day);

  try {
    const dayEvents = await Event.find({
      owner,
      begin: { $gte: date, $lte: date },
    }).exec();

    res.status(200).send(dayEvents);
  } catch (error) {
    res.status(404);
  }

  next();
});

module.exports = router;
