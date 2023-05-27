const express = require("express");
const router = express.Router();
const statisticsController = require("../controllers/statistics-controller");

router.get("/:uid", statisticsController.getStatisticDatesByUserId);

router.post("/", statisticsController.createStatistic);

router.get("/:uid/:did", statisticsController.getDateDay);

module.exports = router;
