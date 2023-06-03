const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const contentsController = require("../controllers/contents-controller");
const Auth = require("../middleware/auth");

router.get("/:cid", contentsController.getContentById);

router.get("/user/:uid", contentsController.getContentsByUserId);

router.use(Auth);

router.post("/", [
  check("content").not().isEmpty(),
  contentsController.createContent,
]);

router.patch("/:cid", contentsController.updateContentById);

router.delete("/:cid", contentsController.deleteContentById);

module.exports = router;
