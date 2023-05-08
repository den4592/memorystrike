const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const topicsController = require("../controllers/topics-controller");

// router.get("/:cid", contentsController.getContentById);

router.get("/:cid", topicsController.getTopics);

router.post("/", [
  check("topic").not().isEmpty(),
  check("description").not().isEmpty(),
  topicsController.createTopic,
]);

// router.post("/:cid", contentsController.updateContentById);

// router.delete("/:cid", contentsController.deleteContentById);

module.exports = router;
