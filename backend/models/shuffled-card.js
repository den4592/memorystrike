const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const statusesSchema = new Schema({
  correct: { type: Boolean, required: true },
  uncertation: { type: Boolean, required: true },
  incorrect: { type: Boolean, required: true },
});

const shuffledCardSchema = new Schema(
  {
    creator: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    topic: { type: String, required: true },
    description: { type: String, required: true },
    statuses: statusesSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("ShuffledCard", shuffledCardSchema);
