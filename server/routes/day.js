const router = require("express").Router();

const Event = require("../models/Event");

function makeDays(startDate = new Date(), numOfDays = 20) {
  const days = {};
  for (let i = 1; i <= numOfDays; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days[date.toISOString().split("T")[0]] = [];
  }
  return days;
}

router.get("/", async (req, res, next) => {
  const { owner } = req.headers;
  const { beginDay } = req.query;

  const inicialDay = beginDay ? new Date(beginDay) : new Date();
  const finalDay = new Date(inicialDay);
  finalDay.setDate(inicialDay.getDate() + 20);

  const days20 = makeDays(inicialDay);

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

    res.status(200).send({ ...days20, ...groupByDate });
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
