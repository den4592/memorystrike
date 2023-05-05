const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Content = require("../models/content");
const Topic = require("../models/topic");
const HttpError = require("../models/http-error");
const User = require("../models/user");

const createTopic = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("콘텐츠를 입력해 주세요.", 422));
  }
  const { topic, description, id, creator } = req.body;

  let createdTopic = new Topic({
    topic,
    description,
    id,
    creator,
  });

  let user;

  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }

  try {
    await User.updateOne(
      {
        _id: creator,
        "contents._id": id,
      },
      {
        $push: {
          "contents.$.topics": createdTopic,
        },
      }
    );
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(200).json({ user: user });
};

exports.createTopic = createTopic;
