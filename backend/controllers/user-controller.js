const { v4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "사용자가 존재하지 않습니다. 나중에 다시 시도해 주세요.",
      500
    );
    return error;
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("잘못된 입력이 전달되었습니다. 데이터를 확인해 주세요", 422)
    );
  }
  console.log(req.body);
  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError(
      "가입하지 못했습니다. 나중에 다시 시도해 주세요",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "사용자가 이미 존재합니다. 로그인해 주세요.",
      422
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password,
    contents: [],
    statistics: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "가입하지 못했습니다. 다시 시도해 주세요.",
      500
    );
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError(
      "로그인하지 못했습니다. 나중에 다시 시도해 주세요.",
      500
    );
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      "잘못된 자격 증명입니다. 로그인할 수 없습니다.",
      401
    );
    return next(error);
  }

  res.json({ token: existingUser.id });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
