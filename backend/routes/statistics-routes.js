const express = require("express");
const router = express.Router();
const statisticsController = require("../controllers/statistics-controller");
const Auth = require("../middleware/auth");

router.get("/:uid", statisticsController.getStatisticDatesByUserId);

router.get("/:uid/:did", statisticsController.getDateDay);

router.use(Auth);

router.post("/", statisticsController.createStatistic);

module.exports = router;
