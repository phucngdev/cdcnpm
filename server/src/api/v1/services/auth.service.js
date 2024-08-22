const pool = require("../../../config/database");

module.exports.registerService = async (body) => {
  try {
    const result = await pool.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [body.name, body.email, body.password]
    );
  } catch (error) {
    throw new Error("Server error");
  }
};
