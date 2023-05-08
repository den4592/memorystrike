const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contentSchema = new Schema(
  {
    content: { type: String, required: true },
    description: { type: String, required: false },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    topics: [{ type: mongoose.Types.ObjectId, required: true, ref: "Topic" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Content", contentSchema);
