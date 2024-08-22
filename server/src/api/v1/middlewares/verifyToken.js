const jwt = require("jsonwebtoken");

module.exports.verifyTokenHandle = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwtDecode.verify(token, process.env.JWT_ACCESS_KEY);
    if (!decoded) {
      return res.status(500).json({ message: "No access" });
    }
    if (decoded.role === 1) {
      // 1 là role user
      return res.status(500).json({ message: "Server error" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "No access" });
  }
};
