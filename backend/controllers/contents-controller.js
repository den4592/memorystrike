const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Content = require("../models/content");
const HttpError = require("../models/http-error");
const User = require("../models/user");

const createContent = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("콘텐츠를 입력해 주세요.", 422));
  }
  const { content, description, creator } = req.body;
  let createdContent;

  if (content && !description) {
    createdContent = new Content({
      content,
      creator,
    });
  }
  if (content && description) {
    createdContent = new Content({
      content,
      description,
      creator,
    });
  }

  let user;

  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError(
      "제공된 ID에 대한 사용자를 찾을 수 없습니다",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "제공된 ID에 대한 사용자를 찾을 수 없습니다",
      404
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    await sess.withTransaction(async () => {
      await createdContent.save();
      user.contents.push(createdContent);
      await user.save();
    });
    await sess.endSession();
  } catch (err) {
    const error = new HttpError(
      "콘텐츠를 생성할 수 없습니다. 다시 시도해 주세요.",
      500
    );
    return next(error);
  }

  res.status(200).json({ content: createdContent.toObject({ getters: true }) });
};

const getContentById = async (req, res, next) => {
  const contentId = req.params.cid;
  let content;
  try {
    content = await Content.findById(contentId);
  } catch (err) {
    const error = new HttpError(
      "콘텐츠를 찾을 수 없습니다. 다시 시도해 주세요.",
      500
    );
    return next(error);
  }

  if (!content) {
    const error = new HttpError("제공한 ID로 콘텐츠를 찾을 수 없습니다.", 404);
    return next(error);
  }

  res.json({ content: content.toObject({ getters: true }) });
};

const getContentsByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let user;
  try {
    user = await User.findById(userId).populate("contents");
  } catch (err) {
    const error = new HttpError(
      "사용자를 찾을 수 없습니다. 다시 시도해 주세요.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("제공한 ID로 사용자를 찾을 수 없습니다.", 404);
    return next(error);
  }

  res.json({
    contents: user.contents
      .sort((prev, cur) => {
        if (prev.createdAt < cur.createdAt) return 1;
        if (prev.createdAt > cur.createdAt) return -1;
      })
      .map((content) => content.toObject({ getters: true })),
  });
};

const updateContentById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("콘텐츠를 찾을 수 없습니다. 다시 시도해 주세요.", 422);
  }

  const { content, description } = req.body;

  const contentId = req.params.cid;

  let findedContent;

  try {
    findedContent = await Content.findById(contentId);
  } catch (err) {
    const error = new HttpError(
      "제공한 ID로 컨텐츠를 찾을 수 없습니다. 다시 시도해 주세요.",
      500
    );
    return next(error);
  }

  findedContent.content = content;
  findedContent.description = description;

  try {
    await findedContent.save();
  } catch (err) {
    const error = new HttpError(
      "제공한 ID로 컨텐츠를 찾을 수 없습니다. 다시 시도해 주세요.",
      500
    );
    return next(error);
  }

  res.status(200).json({ content: findedContent.toObject({ getters: true }) });
};

const deleteContentById = async (req, res, next) => {
  const contentId = req.params.cid;

  let content;

  try {
    content = await Content.findById(contentId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "제공한 ID로 콘텐츠를 찾을 수 없습니다. 나중에 다시 시도해 주세요.",
      500
    );
    return next(error);
  }

  if (!content) {
    const error = new HttpError(
      "제공한 ID로 콘텐츠를 찾을 수 업습니다. 나중에 다시 시도해 주세요.",
      404
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.withTransaction(async () => {
      await Content.findByIdAndDelete(contentId);
      content.creator.contents.pull(content);
      await content.creator.save();
    });
    await sess.endSession();
  } catch (err) {
    const error = new HttpError(
      "콘첸츠를 삭제 할 수 없습니다. 나중에 다시 시도해 주세요.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "콘텐츠를 성공적으로 삭제하였습니다." });
};

exports.createContent = createContent;
exports.getContentById = getContentById;
exports.getContentsByUserId = getContentsByUserId;
exports.updateContentById = updateContentById;
exports.deleteContentById = deleteContentById;
