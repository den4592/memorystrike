const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contentSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Content", contentSchema);
