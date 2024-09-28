const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");

module.exports.getAllUser = async (req, res) => {
  try {
    const decoded = jwt.verify(
      req.cookies.accessToken.slice(1, -1),
      process.env.JWT_ACCESS_KEY
    );
    const result = await userService.getAllUserService(decoded.user_id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.updateStatusUser = async (req, res) => {
  try {
    const result = await userService.updateStatusUserService(
      req.params.id,
      req.params.status
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
