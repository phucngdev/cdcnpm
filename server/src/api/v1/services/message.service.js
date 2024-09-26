const pool = require("../../../config/database");

module.exports.getAllUserService = async (admin_id) => {
  try {
    const [result] = await pool.execute(
      "SELECT * FROM users WHERE user_id != ?",
      [admin_id]
    );
    return result;
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.getMessageUserService = async (room_id) => {
  try {
    const [[user], [message]] = await Promise.all([
      pool.execute("SELECT * FROM users WHERE room_id = ?", [room_id]),
      pool.execute("SELECT * FROM messages WHERE room_id = ?", [room_id]),
    ]);

    return {
      status: 200,
      user: user,
      message: message,
    };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.sendMessageService = async (body) => {
  try {
    await pool.execute(
      "INSERT INTO messages (room_id, sender_id, content) VALUES (?,?,?)",
      [body.room_id, body.sender_id, body.content]
    );
    return { status: 201, message: "Message sent successfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};
