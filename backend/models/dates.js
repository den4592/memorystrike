const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const statusesSchema = new Schema({
  correct: { type: Boolean, required: true },
  uncertation: { type: Boolean, required: true },
  incorrect: { type: Boolean, required: true },
});

const shuffledSchema = new Schema({
  topic: { type: String, required: true },
  description: { type: String, required: true },
  statuses: statusesSchema,
  timestamp: { type: Date, required: true },
});

const datesSchema = new Schema({
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  timestamp: { type: Date, required: true },
  shuffled: [shuffledSchema],
  duration: { type: String, required: true },
});

module.exports = mongoose.model("Dates", datesSchema);
