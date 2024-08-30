const jwt = require("jsonwebtoken");
const pool = require("../../../config/database");

module.exports.verifyTokenHandleAdmin = async (req, res, next) => {
  try {
    const token = await req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }
    const tokenBearer = token.replace("Bearer ", "");
    const decoded = jwt.verify(tokenBearer, process.env.JWT_ACCESS_KEY);
    if (!decoded) {
      return res.status(500).json({ message: "Access denied" });
    }
    const currentTime = Math.floor(Date.now() / 1000);
    const expiresIn = decoded.exp;
    const isExpired = currentTime > expiresIn;
    if (isExpired) {
      return res.status(401).json({ message: "Token expired" });
    }
    const [[user]] = await pool.execute(
      "SELECT * FROM users WHERE user_id = ?",
      [decoded.user_id]
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.verifyToken = async (req, res, next) => {
  try {
    const token = await req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }
    const tokenBearer = token.replace("Bearer ", "");
    const decoded = jwt.verify(tokenBearer, process.env.JWT_ACCESS_KEY);
    if (!decoded) {
      return res.status(500).json({ message: "Access denied" });
    }
    const currentTime = Math.floor(Date.now() / 1000);
    const expiresIn = decoded.exp;
    const isExpired = currentTime > expiresIn;
    if (isExpired) {
      return res.status(401).json({ message: "Token expired" });
    }
    const [[user]] = await pool.execute(
      "SELECT * FROM users WHERE user_id = ?",
      [decoded.user_id]
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
