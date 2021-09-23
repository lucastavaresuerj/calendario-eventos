require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const eventRouter = require("./routes/event");
const { verify } = require("./auth");

const { MONGO_CONNECTION, DB_NAME } = process.env;
const mongoDB = `${MONGO_CONNECTION}/${DB_NAME}`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

app.use("/user", userRouter);
app.use("/event", verify, eventRouter);
