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
  let createdContent;
  const { content, description, creator } = req.body;

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
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdContent.save({ session: sess });
    user.contents.push(createdContent.toObject({ getters: true }));
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(200).json({ content: createdContent });
};

const getContentById = async (req, res, next) => {
  const contentId = req.params.cid;
  let content;
  try {
    content = await Content.findAll(contentId);
  } catch (err) {
    const error = new HttpError(
      "콘텐츠를 찾을 수 없습니다. 다시 시도해 주세요.",
      500
    );
    return next(error);
  }

  if (!content) {
    const error = new HttpError("제공한 id로 콘텐츠를 찾을 수 없습니다.", 404);
    return next(error);
  }

  res.json({ content: content.toObject({ getters: true }) });
};

const getContentsByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "사용자를 찾을 수 없습니다. 다시 시도해 주세요.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("제공한 id로 사용자를 찾을 수 없습니다.", 404);
    return next(error);
  }

  res.json(
    await User.aggregate([
      {
        $project: {
          contents: {
            $sortArray: { input: "$contents", sortBy: { createdAt: -1 } },
          },
        },
      },
    ])
  );
};

const updateContentById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("콘텐츠를 찾을 수 없습니다. 다시 시도해 주세요.", 422);
  }

  const { content, description, creator } = req.body;
  const contentId = req.params.cid;
  const user = await User.findById(creator);

  //content update
  await User.updateOne(
    {
      _id: creator,
      "contents._id": contentId,
    },
    {
      $set: {
        "contents.$.content": content,
        "contents.$.description": description,
      },
    }
  );

  res.status(200).json({ user: user });
};

const deleteContentById = async (req, res, next) => {
  const contentId = req.body.id;
  const userId = req.body.userId;
  let content;

  try {
    content = await Content.findById(contentId);
  } catch (err) {
    const error = new HttpError(
      "콘텐츠를 삭제할 수 없습니다. 다시 시도해 주세요.",
      500
    );
    return next(error);
  }

  if (!content) {
    const error = new HttpError(
      "제공한 id로 콘텐츠를 삭제할 수 없습니다.",
      404
    );
    return next(error);
  }

  try {
    await User.updateOne(
      { _id: userId },
      { $pull: { contents: { id: contentId } } }
    );
    await Content.findByIdAndRemove(contentId);
    // await user.contents.save({ session: sess });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place.",
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
