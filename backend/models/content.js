const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contentSchema = new Schema({
  topic: { type: String, required: true },
  description: { type: String, required: false },
});

module.exports = mongoose.model("Content", contentSchema);
