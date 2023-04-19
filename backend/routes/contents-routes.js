const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const contentsController = require("../controllers/contents-controller");

router.get(
  "/:cid",

  contentsController.getContentById
);

router.post("/", [
  check("title").not().isEmpty(),
  check("description").not().isEmpty(),
  contentsController.createContent,
]);

module.exports = router;
