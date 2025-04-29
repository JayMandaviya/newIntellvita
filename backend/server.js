const express = require("express");
const app = express();
const cors = require("cors");
const leaderboardRoutes = require("./routes/leaderboardRoutes");

app.use(cors());
app.use(express.json());
app.use("/api", leaderboardRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
