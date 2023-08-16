const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");
const User = require("../models/user");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const refreshTokenCookieCache = new Map();

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

const getUserById = async (req, res, next) => {
  const userId = req.params.uid;
  let user;
  try {
    user = await User.findOne({ _id: userId }, "-password");
  } catch (err) {
    const error = new HttpError(
      "사용자가 존재하지 않습니다. 나중에 다시 시도해 주세요.",
      500
    );
    return error;
  }
  res.json({ user });
};

const changeFirstLoginStatus = async (req, res, next) => {
  const userId = req.params.uid;
  try {
    await User.updateOne(
      { _id: userId },
      {
        $set: {
          isFirstLogin: false,
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

  res.json("성공적으로 변경하였습니다!");
};

const signup = async (req, res, next) => {
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

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "사용자를 생성할 수 없습니다. 나중에 다시 시도해 주세요.",
      500
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    isFirstLogin: true,
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

  res.status(201).json({ message: "회원가입에 성공하였습니다." });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError(
      "사용자를 찾을 수 없습니다. 회원가입을 진행해 주세요.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "사용자를 찾을 수 없습니다. 회원가입을 진행해 주세요.",
      401
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.",
      401
    );
    return next(error);
  }

  let accessToken;
  let refreshToken;
  try {
    accessToken = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    refreshToken = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      REFRESH_TOKEN_SECRET
    ); // No expiration
    // Save the refresh token in an HttpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      expiresIn: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    }); // 30 days

    //setting cookie in cache memory
    refreshTokenCookieCache.set(refreshToken, refreshToken);
  } catch (err) {
    const error = new HttpError(
      "로그인 할 수 없습니다. 나중에 다시 시도해 주세요.",
      500
    );
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: accessToken,
  });
};

const refresh = async (req, res, next) => {
  let refreshToken;
  if (refreshTokenCookieCache.has(req.cookies.refreshToken)) {
    refreshToken = refreshTokenCookieCache.get(req.cookies.refreshToken);
  } else {
    refreshToken = req.cookies.refreshToken;
    refreshTokenCookieCache.set(req.cookies.refreshToken, refreshToken);
  }

  if (!refreshToken) {
    return res.status(403).json({ message: "Refresh token not provided" });
  }

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const userId = decoded.userId;

    const accessToken = jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    res.json({ accessToken });
  });
};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.changeFirstLoginStatus = changeFirstLoginStatus;
exports.signup = signup;
exports.login = login;
exports.refresh = refresh;
