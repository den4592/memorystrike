const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const topicsSchema = new Schema(
  {
    topic: { type: String, required: true },
    description: { type: String, required: false },
    contentId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Content",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", topicsSchema);
