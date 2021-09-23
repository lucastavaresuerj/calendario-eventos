const cors = require("cors");
const express = require("express");

const { PORT } = process.env;

const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.listen(PORT, async () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

module.exports = app;
