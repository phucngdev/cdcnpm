const pool = require("../../../config/database");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cartService = require("./cart.service");

const generateAccessToken = (user_id) => {
  return jwt.sign(
    {
      user_id: user_id,
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
    const roomId = uuidv4();
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(body.password.trim(), salt);
    const result = await Promise.allSettled([
      pool.execute("INSERT INTO carts (cart_id) VALUES (?)", [cartId]),
      pool.execute("INSERT INTO room_chat (room_id) VALUES (?)", [roomId]),
      pool.execute(
        "INSERT INTO users (user_id, username, email, password, avatar, cart_id, room_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          userId,
          body.username,
          body.email,
          hashed,
          body.avatar || "",
          cartId,
          roomId,
        ]
      ),
    ]);

    const check_result = result.find((s) => s.status !== "fulfilled");

    if (check_result) {
      return { status: 500, message: "Internal Server Error" };
    }

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

    const cart = await cartService.getCartByIdService(result.user_id);

    const accessToken = generateAccessToken(result.user_id);
    const refreshToken = generateRefreshToken(result.user_id);
    console.log(refreshToken);

    await pool.execute(
      "INSERT INTO refresh_token (refresh_token_id, token) VALUES (?, ?)",
      [uuidv4(), refreshToken]
    );

    return {
      status: 200,
      message: "Login successfully",
      accessToken: accessToken,
      refreshToken: refreshToken,
      cart: cart,
      user_info: {
        user_id: result.user_id,
        username: result.username,
        email: result.email,
        avatar: result.avatar,
      },
    };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.checkRoleAdminService = async () => {
  try {
    return { status: 200, message: "User has admin role" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};
