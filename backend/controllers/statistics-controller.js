const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const User = require("../models/user");
const Statistic = require("../models/statistic");
const Dates = require("../models/dates");

function getCurrentDate() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  let today = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let milliseconds = date.getMilliseconds();
  return new Date(
    Date.UTC(year, month, today, hours, minutes, seconds, milliseconds)
  );
}

const createStatistic = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Validation Failed", 422));
  }

  const { creator, shuffled, duration, date } = req.body;

  const timestamp = date;

  //timestamp가 이미 존재하면 기존 Dates에 push / 존재하지 않으면 새로운 Date를 생성 후 push
  try {
    const todayObject = await Dates.find({
      creator: creator,
      timestamp: timestamp,
    });

    const dateObject = await Dates.findOne({
      creator: creator,
      timestamp: timestamp,
    });

    //있으면 거기에 추가
    if (todayObject.length) {
      let dur = dateObject.duration;
      await Dates.updateOne(
        {
          creator: creator,
          timestamp: timestamp,
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
      await Dates.insertMany({
        creator,
        shuffled,
        duration,
        timestamp,
      });
    }
  } catch (err) {
    const error = new HttpError(
      "통계를 생성할 수 없습니다. 나중에 다시 시도해 주세요.",
      500
    );
    return next(error);
  }

  const dates = await Dates.findOne({ creator: creator });
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
  } catch (err) {
    const error = new HttpError("통계가 존재하지 않습니다.", 500);
    return next(error);
  }

  let user;
  let stats = await Statistic.find();

  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError(
      "제공한 ID로 사용자를 찾을 수 없습니다. 나중에 다시 시도해 주세요.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "사용자를 찾을 수 없습니다. 나중에 다시 시도해 주세요.",
      404
    );
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
      "사용자를 업데이트 할 수 없습니다. 나중에 다시 시도해 주세요.",
      500
    );
    return next(error);
  }

  res.status(200).json({ user: user });
};

const getStatisticDatesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let dates;

  try {
    dates = await Dates.find({
      creator: userId,
    }).populate("shuffled");
  } catch (err) {
    const error = new HttpError(
      "제공한 ID로 Date를 찾을 수 없습니다. 나중에 다시 시도해 주세요.",
      500
    );
    return next(error);
  }

  if (!dates) {
    const error = new HttpError(
      "Date가 존재하지 않습니다. 나중에 다시 시도해 주세요.",
      404
    );
    return next(error);
  }

  dates.map((date) =>
    date.shuffled.sort((prev, cur) => {
      if (prev.timestamp < cur.timestamp) return 1;
      if (prev.timestamp > cur.timestamp) return -1;
    })
  ),
    res.json({
      dates: dates.map((date) => date),
    });
};

const getDateDay = async (req, res, next) => {
  const creator = req.params.uid;
  const date = req.params.did;
  let day;

  try {
    day = await Dates.findOne({
      creator: creator,
      timestamp: date,
    });
  } catch (err) {
    const error = new HttpError(
      "Date를 찾을 수 없습니다. 나중에 다시 시도해 주세요.",
      500
    );
    return next(error);
  }

  res.json([day]);
};

exports.createStatistic = createStatistic;
exports.getStatisticDatesByUserId = getStatisticDatesByUserId;
exports.getDateDay = getDateDay;
