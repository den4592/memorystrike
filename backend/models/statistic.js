const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const statisticSchema = new Schema(
  {
    creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    shuffled: [{ type: mongoose.Types.ObjectId, required: true, ref: "Date" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Statistic", statisticSchema);
