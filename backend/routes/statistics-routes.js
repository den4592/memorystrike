const express = require("express");
const router = express.Router();
const statisticsController = require("../controllers/statistics-controller");

router.get("/:uid", statisticsController.getStatisticDatesByUserId);

router.post("/", statisticsController.createStatistic);

module.exports = router;
