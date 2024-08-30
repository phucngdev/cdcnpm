const axios = require("axios");
const pool = require("../../../config/database");

module.exports.verifyEmailWithGoogle = async (req, res, next) => {
  try {
    const { email } = req.body;
    const apiKey = process.env.API_KEY_HUNTER;

    const response = await axios.get(
      `https://api.hunter.io/v2/email-verifier`,
      {
        params: {
          email: email,
          api_key: apiKey,
        },
      }
    );

    const { result, score } = response.data.data;

    if (result !== "deliverable" || score < 80) {
      return res
        .status(400)
        .json({ message: "Invalid or non-existent email address" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.checkEmailExists = async (req, res, next) => {
  try {
    const { email } = req.body;
    const [[user]] = await pool.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
