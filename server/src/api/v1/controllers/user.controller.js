const userService = require("../services/user.service");

module.exports.getAllUser = async (req, res) => {
  try {
    const result = await userService.getAllUserService();
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
