
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const participants = new Schema({
    name: { type: String, required: true },
    focus: { type: Number, required: false },
  });
  module.exports = mongoose.model("participants", participants);
