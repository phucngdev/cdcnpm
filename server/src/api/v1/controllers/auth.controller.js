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
    if (result.status === 200) {
      res
        .cookie("accessToken", JSON.stringify(result.accessToken), {
          httpOnly: true,
          // expires: new Date(Date.now() + 6 * 60 * 60 * 1000),
          expires: new Date(Date.now() + 6 * 1000),
          secure: false,
        })
        .cookie("refreshToken", JSON.stringify(result.refreshToken), {
          httpOnly: true,
          expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          secure: false,
        })
        .cookie("user_info", JSON.stringify(result.user_info), {
          httpOnly: false,
          expires: new Date(Date.now() + 6 * 60 * 60 * 1000),
          secure: false,
        });
    }
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.checkRoleAdmin = async (req, res) => {
  try {
    const result = await authService.checkRoleAdminService();
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.logout = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.clearCookie("user_info");
    return res.json({ status: 200, message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.refreshToken = async (req, res) => {
  try {
    const result = await authService.refreshTokenService(
      req.cookie.refreshToken
    );
    if (result.status === 200) {
      res
        .cookie("accessToken", JSON.stringify(result.accessToken), {
          httpOnly: true,
          // expires: new Date(Date.now() + 6 * 60 * 60 * 1000),
          expires: new Date(Date.now() + 6 * 1000),
          secure: false,
        })
        .cookie("user_info", JSON.stringify(result.user_info), {
          httpOnly: false,
          expires: new Date(Date.now() + 6 * 60 * 60 * 1000),
          secure: false,
        });
    }
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
