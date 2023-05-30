const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const topicsController = require("../controllers/topics-controller");
const Auth = require("../middleware/auth");

router.get("/:cid", topicsController.getTopics);

router.use(Auth);

router.post("/", [
  check("topic").not().isEmpty(),
  check("description").not().isEmpty(),
  topicsController.createTopic,
]);

router.post("/:tid", topicsController.updateTopictById);

router.delete("/:tid", topicsController.deleteTopicById);

module.exports = router;
