const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const User = require("../models/user");
const Statistic = require("../models/statistic");
const Date = require("../models/dates");

const createStatistic = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("콘텐츠를 입력해 주세요.", 422));
  }

  const { creator, shuffled, duration, date } = req.body;
  console.log(duration);

  //조건 - 있으면 push / 없으면 create후 push
  try {
    const todayObject = await Date.find({
      creator: creator,
      createdAt: { $gte: date },
    });

    console.log(todayObject);

    //있으면 거기에 추가
    if (todayObject.length) {
      const dateObject = await Date.findOne({
        creator: creator,
        createdAt: { $gte: date },
      });

      let dur = dateObject.duration;

      console.log(dateObject);
      console.log("dur", parseInt(dur));
      console.log("duration", parseInt(duration));

      await Date.updateOne(
        {
          creator: creator,
          createdAt: { $gte: date },
        },
        {
          $set: {
            duration: parseInt(dur) + parseInt(duration),
          },
          $push: {
            shuffled: shuffled,
          },
        }
      );
    }

    //없으면 생성 후 추가
    if (todayObject.length === 0) {
      await Date.insertMany({ creator, shuffled, duration });
      await Date.updateOne(
        {
          creator: creator,
          createdAt: { $gte: date },
        },
        {
          $set: {
            shuffled: shuffled,
          },
        }
      );
    }
  } catch (error) {
    console.log(error);
  }

  const dates = await Date.findOne({ creator: creator });
  const statistic = await Statistic.findOne({ creator: creator });

  try {
    if (statistic !== null) {
      await Statistic.updateOne(
        { creator: creator },
        {
          $set: {
            dates: dates,
          },
        }
      );
    }
    if (statistic === null) {
      await Statistic.insertMany({ creator, dates });
      await Statistic.updateOne(
        { creator: creator },
        {
          $set: {
            dates: dates,
          },
        }
      );
    }
  } catch (error) {}

  let user;
  let stats = await Statistic.find();

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
      { _id: creator },
      {
        $set: {
          statistics: stats,
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

const getStatisticByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let statistic;
  try {
    statistic = await Statistic.find({ creator: userId }).populate("dates");
  } catch (err) {
    const error = new HttpError(
      "콘텐츠를 찾을 수 없습니다. 다시 시도해 주세요.",
      500
    );
    return next(error);
  }

  if (!statistic) {
    const error = new HttpError("제공한 id로 콘텐츠를 찾을 수 없습니다.", 404);
    return next(error);
  }

  res.json({ statistics: statistic });
};
exports.createStatistic = createStatistic;
exports.getStatisticByUserId = getStatisticByUserId;
