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

  let arr = [];
  for (let i = 0; i < shuffled.length; i++) {
    shuffled[i].creator = creator;
    arr.push(shuffled[i]);
  }

  await ShuffledCard.insertMany(arr);

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
      user.statistics.push(stat);
      await user.save();
      const data = await ShuffledCard.find();
      for (let i = 0; i < data.length; i++) {
        stat.shuffled.push(data[i]);
      }
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

  const shuffledCard = await ShuffledCard.find();

  res.status(200).json({
    data: shuffledCard.map((card) => card.toObject({ getters: true })),
  });
};

exports.createStatistic = createStatistic;
