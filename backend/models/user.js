const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const testSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  description: { type: String, required: true },
});

const subSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    description: { type: String, required: true },
    topics: [testSchema],
  },
  { timestamps: true }
);

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLegth: 6 },
  contents: [subSchema],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
