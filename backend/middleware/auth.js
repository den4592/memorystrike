const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = process.env;
const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.slice(6); //Bearer 'Token'

    if (!token) {
      throw new Error("Authentication Failed");
    }
    const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError("Authentication Failed", 401);
    return next(error);
  }
};
