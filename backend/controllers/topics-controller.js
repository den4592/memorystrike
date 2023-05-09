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
  const { topic, description, contentId } = req.body;

  let createdTopic = new Topic({
    topic,
    description,
    contentId,
  });

  let content;

  try {
    content = await Content.findById(contentId);
  } catch (err) {
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }

  if (!content) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdTopic.save({ session: sess });
    content.topics.push(createdTopic);
    await content.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(200).json({ topic: createdTopic.toObject({ getters: true }) });
};

const getTopics = async (req, res, next) => {
  const contentId = req.params.cid;
  let content;

  try {
    content = await Content.findById(contentId).populate("topics");
  } catch (err) {
    const error = new HttpError(
      "사용자를 찾을 수 없습니다. 다시 시도해 주세요.",
      500
    );
    return next(error);
  }

  if (!content) {
    const error = new HttpError("제공한 id로 사용자를 찾을 수 없습니다.", 404);
    return next(error);
  }

  res.json({
    topics: content.topics
      .sort((prev, cur) => {
        if (prev.createdAt < cur.createdAt) return 1;
        if (prev.createdAt > cur.createdAt) return -1;
      })
      .map((topic) => topic.toObject({ getters: true })),
  });
};

const updateTopictById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("콘텐츠를 찾을 수 없습니다. 다시 시도해 주세요.", 422);
  }

  const { topic, description } = req.body;

  const topicId = req.params.tid;

  let findedTopic;

  try {
    findedTopic = await Topic.findById(topicId);
  } catch (err) {
    const error = new HttpError(
      "제공한 id로 컨텐츠를 찾을 수 없습니다. 다시 시도해 주세요.",
      500
    );
    return next(error);
  }

  findedTopic.topic = topic;
  findedTopic.description = description;

  try {
    await findedTopic.save();
  } catch (err) {
    const error = new HttpError(
      "제공한 id로 컨텐츠를 찾을 수 없습니다. 다시 시도해 주세요.",
      500
    );
    return next(error);
  }

  res.status(200).json({ topic: findedTopic.toObject({ getters: true }) });
};

const deleteTopicById = async (req, res, next) => {
  const topicId = req.params.tid;

  let topic;

  try {
    topic = await Topic.findById(topicId).populate("contentId");
  } catch (err) {
    const error = new HttpError(
      "콘텐츠를 삭제할 수 없습니다. 다시 시도해 주세요.",
      500
    );
    return next(error);
  }

  if (!topic) {
    const error = new HttpError(
      "제공한 id로 콘텐츠를 삭제할 수 없습니다.",
      404
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await Topic.findByIdAndDelete(topicId);
    topic.contentId.topics.pull(topic);
    await topic.contentId.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "콘텐츠를 성공적으로 삭제하였습니다." });
};

exports.createTopic = createTopic;
exports.getTopics = getTopics;
exports.updateTopictById = updateTopictById;
exports.deleteTopicById = deleteTopicById;
