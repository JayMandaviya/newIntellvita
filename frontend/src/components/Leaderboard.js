import React, { useState, useEffect } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    const res = await axios.get(
      `/api/leaderboard?filter=${filter}&search=${search}`
    );
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [filter, search]);

  const handleRecalculate = async () => {
    await axios.post("/api/recalculate");
    fetchData();
  };

  return (
    <div>
      <h1>Leaderboard</h1>
      <input
        type="text"
        placeholder="Search by ID"
        onChange={(e) => setSearch(e.target.value)}
      />
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="">All</option>
        <option value="day">Today</option>
        <option value="month">This Month</option>
        <option value="year">This Year</option>
      </select>
      <button onClick={handleRecalculate}>Recalculate</button>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>User ID</th>
            <th>Full Name</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.rank}</td>
              <td>{user.id}</td>
              <td>{user.full_name}</td>
              <td>{user.total_points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
