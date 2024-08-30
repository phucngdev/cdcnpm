const pool = require("../../../config/database");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateAccessToken = (user_id, username, email, avatar) => {
  return jwt.sign(
    {
      user_id: user_id,
      username: username,
      email: email,
      avatar: avatar,
    },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: "10h" }
  );
};

const generateRefreshToken = (user_id) => {
  return jwt.sign(
    {
      user_id: user_id,
    },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: "365d" }
  );
};

module.exports.registerService = async (body) => {
  try {
    const userId = uuidv4();
    const cartId = uuidv4();
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(body.password.trim(), salt);
    await pool.execute("INSERT INTO carts (cart_id) VALUES (?)", [cartId]);
    await pool.execute(
      "INSERT INTO users (user_id, username, email, password, avatar, cart_id) VALUES (?, ?, ?, ?, ?, ?)",
      [userId, body.username, body.email, hashed, body.avatar, cartId]
    );

    return { status: 201, message: "Register successfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.loginService = async (body) => {
  try {
    const [[result]] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [body.email]
    );

    if (!result) {
      return { status: 401, message: "Invalid email" };
    }

    const match = await bcrypt.compare(body.password.trim(), result.password);

    if (!match) {
      return { status: 401, message: "Invalid email or password" };
    }

    const accessToken = generateAccessToken(
      result.user_id,
      result.username,
      result.email,
      result.avatar
    );

    return {
      status: 200,
      message: "Login successfully",
      accessToken: accessToken,
    };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};
