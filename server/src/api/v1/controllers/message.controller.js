const messageService = require("../services/message.service");
const jwt = require("jsonwebtoken");

module.exports.getAllUser = async (req, res) => {
  try {
    const { user_id } = jwt.verify(
      req.cookies.accessToken.slice(1, -1),
      process.env.JWT_ACCESS_KEY
    );
    console.log(user_id);

    const result = await messageService.getAllUserService(user_id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.getMessageUser = async (req, res) => {
  try {
    const result = await messageService.getMessageUserService(
      req.params.room_id,
      req.params.created_at
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.sendMessage = async (req, res) => {
  try {
    const result = await messageService.sendMessageService(
      req.params.id,
      req.body
    );
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
