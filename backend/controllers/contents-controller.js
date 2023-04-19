const { validationResult } = require("express-validator");

const Content = require("../models/content");
const HttpError = require("../models/http-error");

const createContent = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("콘텐츠를 입력해 주세요.", 422));
  }

  const { title, description } = req.body;

  const createdContent = new Content({
    title,
    description,
  });

  try {
    await createdContent.save();
  } catch (err) {
    const error = new HttpError(
      "콘텐츠를 생성할 수 없습니다. 다시 시도해 주세요.",
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
    content = await Content.findById(contentId);
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

const updateContentById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("콘텐츠를 찾을 수 없습니다. 다시 시도해 주세요.", 422);
  }

  const { title, description } = req.body;
  const contentId = req.params.cid;
  let content;

  //content update
  try {
    content = await Content.findById(contentId);
    if (title) {
      content.title = title;
    }
    if (description) {
      content.description = description;
    }
  } catch (err) {
    const error = new HttpError(
      "콘텐츠를 업데이트 할 수 없습니다. 다시 시도해 주세요.",
      500
    );
    return next(error);
  }

  //saving updated content
  try {
    await content.save();
  } catch (err) {
    const error = new HttpError(
      "콘텐츠를 업데이트 할 수 없습니다. 다시 시도해 주세요.",
      500
    );
    return next(error);
  }

  res.status(200).json({ content: content.toObject({ getters: true }) });
};

const deleteContentById = async (req, res, next) => {
  const contentId = req.params.cid;
  let content;

  try {
    content = await Content.findById(contentId);
    console.log(content);
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
    await content.deleteOne({ id: contentId });
  } catch (err) {
    const error = new HttpError(
      "콘텐츠를 삭제할 수 없습니다. 다시 시도해 주세요.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "콘텐츠를 성공적으로 삭제하였습니다." });
};

exports.createContent = createContent;
exports.getContentById = getContentById;
exports.updateContentById = updateContentById;
exports.deleteContentById = deleteContentById;
