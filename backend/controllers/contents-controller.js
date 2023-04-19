const { validationResult } = require("express-validator");

const Content = require("../models/content");

const createContent = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new Error("Invalid inputs passed, please check your data."));
  }

  const { title, description } = req.body;

  const createdContent = new Content({
    title,
    description,
  });

  try {
    await createdContent.save();
  } catch (err) {
    return next(new Error());
  }

  res.status(200).json({ content: createdContent });
};

const getContentById = async (req, res, next) => {
  const contentId = req.params.cid;
  let content;
  try {
    content = await Content.findById(contentId); //객체 반환
  } catch (err) {
    return next(new Error());
  }

  if (!content) {
    return next(new Error());
  }

  res.json({ content: content.toObject({ getters: true }) });
};

exports.createContent = createContent;
exports.getContentById = getContentById;
