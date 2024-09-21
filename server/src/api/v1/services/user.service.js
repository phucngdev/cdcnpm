const pool = require("../../../config/database");

module.exports.getAllUserService = async () => {
  try {
    const [users] = await pool.execute("SELECT * FROM users");
    return users;
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.updateStatusUserService = async (id, status) => {
  console.log(id, status);

  try {
    await pool.execute("UPDATE users SET status = ? WHERE user_id = ?", [
      status,
      id,
    ]);
    return { status: 200, message: "User status updated successfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};
