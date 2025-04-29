const db = require("../models/db");

async function calculateRanks() {
  const [rows] = await db.promise().query(
    `SELECT user_id, SUM(points) as total_points
     FROM activities
     GROUP BY user_id
     ORDER BY total_points DESC`
  );
  
  let rank = 1;
  let prevPoints = null;
  let sameRankCount = 0;

  await db.promise().query(`DELETE FROM leaderboard`);

  for (let i = 0; i < rows.length; i++) {
    const { user_id, total_points } = rows[i];

    if (total_points == prevPoints) {
      sameRankCount++;
    } else {
      rank = i + 1;
      sameRankCount = 0;
    }

    prevPoints = total_points;

    await db.promise().query(
      `INSERT INTO leaderboard (user_id, total_points, \`rank\`)
       VALUES (?, ?, ?)`,
      [user_id, total_points, rank - sameRankCount]
    );
  }
}

module.exports = calculateRanks;
