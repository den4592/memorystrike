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
});

const datesSchema = new Schema(
  {
    creator: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    shuffled: [shuffledSchema],
    duration: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Date", datesSchema);
