const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const userController = require("../controllers/user-controller");
const Auth = require("../middleware/auth");

router.get("/", userController.getUsers);

router.get("/:uid", userController.getUserById);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  userController.signup
);

router.post("/login", userController.login);

router.post("/refresh", userController.refresh);

router.post("/:uid", userController.changeFirstLoginStatus);

module.exports = router;
