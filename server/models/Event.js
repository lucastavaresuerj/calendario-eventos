const mongoose = require("mongoose");
const { Schema } = mongoose;

const Event = new Schema({
  title: String,
  description: String,
  begin: Date,
  finish: Date,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  guests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Event", Event);
