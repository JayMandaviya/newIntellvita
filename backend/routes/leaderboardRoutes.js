const express = require("express");
const router = express.Router();
const controller = require("../controllers/leaderboardController");

router.get("/leaderboard", controller.getLeaderboard);
router.post("/recalculate", controller.recalculate);

module.exports = router;
