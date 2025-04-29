const db = require("../models/db");
const { faker } = require("@faker-js/faker");

(async () => {
  for (let i = 1; i <= 20; i++) {
    await db
      .promise()
      .query("INSERT INTO users (full_name) VALUES (?)", [
        faker.name.fullName(),
      ]);
  }

  for (let i = 1; i <= 200; i++) {
    const userId = Math.ceil(Math.random() * 20);
    const date = faker.date.recent(30);
    await db
      .promise()
      .query("INSERT INTO activities (user_id, timestamp) VALUES (?, ?)", [
        userId,
        date,
      ]);
  }

  console.log("✅ Dummy data inserted.");
})();
