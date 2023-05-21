const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const User = require("../models/user");
const Statistic = require("../models/statistic");
const ShuffledCard = require("../models/shuffled-card");

const createStatistic = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("콘텐츠를 입력해 주세요.", 422));
  }
  const { creator, shuffled } = req.body;

  const statistic = new Statistic({
    creator,
  });

  await statistic.save();

  const shuffledCard = new ShuffledCard({
    creator,
    topic: shuffled[0].topic,
    description: shuffled[0].description,
    statuses: {
      correct: shuffled[0].statuses.correct,
      uncertation: shuffled[0].statuses.uncertation,
      incorrect: shuffled[0].statuses.incorrect,
    },
  });

  await shuffledCard.save();

  let user;
  let stat;

  try {
    user = await User.findById(creator);
    stat = await Statistic.findOne({ creator: creator });
  } catch (err) {
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    await sess.withTransaction(async () => {
      user.statistics.push(statistic);
      await user.save();
      stat.shuffled.push(shuffledCard);
      await stat.save();
    });
    await sess.endSession();
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(200).json({ user: user });
};

exports.createStatistic = createStatistic;
