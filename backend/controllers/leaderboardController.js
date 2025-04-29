const db = require("../models/db");
const calculateRanks = require("../utils/calculateRank");

exports.getLeaderboard = async (req, res) => {
  const { filter, search } = req.query;

  let whereClause = "";
  if (filter == "day") {
    whereClause = "AND DATE(a.timestamp) = CURDATE()";
  } else if (filter == "month") {
    whereClause =
      "AND MONTH(a.timestamp) = MONTH(CURDATE()) AND YEAR(a.timestamp) = YEAR(CURDATE())";
  } else if (filter == "year") {
    whereClause = "AND YEAR(a.timestamp) = YEAR(CURDATE())";
  }

  const [rows] = await db.promise().query(
    `SELECT u.id, u.full_name, l.total_points, l.rank
     FROM users u
     JOIN leaderboard l ON u.id = l.user_id
     LEFT JOIN activities a ON u.id = a.user_id
     WHERE 1=1 ${whereClause}
     GROUP BY u.id, l.total_points, l.rank
     ORDER BY l.rank ASC`
  );

  let results = rows;
  if (search) {
    const searchUser = results.find((user) => user.id.toString() == search);
    if (searchUser) {
      results = [searchUser, ...results.filter((u) => u.id != searchUser.id)];
    }
  }

  res.json(results);
};

exports.recalculate = async (req, res) => {
  await calculateRanks();
  res.send({ message: "Leaderboard recalculated" });
};
