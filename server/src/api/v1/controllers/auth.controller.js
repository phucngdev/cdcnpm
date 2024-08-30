const authService = require("../services/auth.service");

module.exports.register = async (req, res) => {
  try {
    const result = await authService.registerService(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const result = await authService.loginService(req.body);
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
