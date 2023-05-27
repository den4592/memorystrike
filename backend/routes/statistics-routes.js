const express = require("express");
const router = express.Router();
const statisticsController = require("../controllers/statistics-controller");

router.get("/:uid", statisticsController.getStatisticDatesByUserId);

router.post("/", statisticsController.createStatistic);

router.get("/", statisticsController.getDateDay);

module.exports = router;
