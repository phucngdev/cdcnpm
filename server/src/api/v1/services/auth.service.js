const pool = require("../../../config/database");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cartService = require("./cart.service");

// tạo accesstoken với user id
const generateAccessToken = (user_id) => {
  // trả về token với time 6h
  return jwt.sign(
    {
      user_id: user_id,
    },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: "6h" }
  );
};

// tạo refresh token với user id
const generateRefreshToken = (user_id) => {
  // trả về token với time 365d
  return jwt.sign(
    {
      user_id: user_id,
    },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: "365d" }
  );
};

// đăng ký
module.exports.registerService = async (body) => {
  try {
    // tạo id với uuidv4
    const userId = uuidv4();
    const cartId = uuidv4();
    const roomId = uuidv4();
    // mã hóa password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(body.password.trim(), salt);
    // tạo user và cart, room
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

    // kiểm tra promise
    const check_result = result.find((s) => s.status !== "fulfilled");

    if (check_result) {
      // nếu 1 cái thất bại trả về lỗi
      return { status: 500, message: "Internal Server Error" };
    }
    // trả về status và kq
    return { status: 201, message: "Register successfully" };
  } catch (error) {
    // trả về status và kq
    return { status: 500, message: error.message };
  }
};

// đăng nhập
module.exports.loginService = async (body) => {
  try {
    // kiểm tra email đã đăng ký hay chưa
    const [[result]] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [body.email]
    );

    if (!result) {
      // không tồn tại trả về 401
      return { status: 401, message: "Invalid email" };
    }

    if (result.status === 0) {
      // user đã bị khoá trả về 403
      return { status: 403, message: "User is not active" };
    }
    // kiểm tra mật khẩu
    const match = await bcrypt.compare(body.password.trim(), result.password);

    if (!match) {
      // sai mật khẩu trả về 401
      return { status: 401, message: "Invalid email or password" };
    }
    // lấy thông tin giỏ hàng
    const cart = await cartService.getCartByIdService(result.user_id);
    // tạo token
    const accessToken = generateAccessToken(result.user_id);
    const refreshToken = generateRefreshToken(result.user_id);
    // lưu refreshtoken
    await pool.execute(
      "INSERT INTO refresh_token (refresh_token_id, token) VALUES (?, ?)",
      [uuidv4(), refreshToken]
    );
    // trả về kết quả
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
        room_id: result.room_id,
      },
    };
  } catch (error) {
    // trả về status và kq
    return { status: 500, message: error.message };
  }
};

// kiểm tra role admin
module.exports.checkRoleAdminService = async () => {
  try {
    //  đã kiểm tra qua middleware
    return { status: 200, message: "User has admin role" };
  } catch (error) {
    // trả về status và kq
    return { status: 500, message: error.message };
  }
};

// đăng xuất
module.exports.logoutService = async (ref) => {
  try {
    // xóa refresh token
    await pool.execute("DELETE FROM refresh_token WHERE token = ?", [ref]);
    // trả về status và kq
    return { status: 200, message: "Logout successfully" };
  } catch (error) {
    // trả về status và kq
    return { status: 500, message: error.message };
  }
};

// refresh accesstoken
module.exports.refreshTokenService = async (refreshtoken) => {
  console.log(
    "🚀 ~ module.exports.refreshTokenService= ~ refreshtoken:",
    refreshtoken
  );
  try {
    // kiểm tra refresh token
    const decoded = jwt.verify(refreshtoken, process.env.JWT_REFRESH_KEY);
    console.log("🚀 ~ module.exports.refreshTokenService= ~ decoded:", decoded);
    if (!decoded) {
      // sai refresh token trả về 401
      return { status: 401, message: "Invalid refresh token" };
    }
    // kiểm tra refresh token đã tồn tại chưa
    const [[refreshToken]] = await pool.execute(
      "SELECT * FROM refresh_token WHERE token = ?",
      [refreshtoken]
    );

    if (!refreshToken) {
      // sai refresh token trả về 401
      return { status: 401, message: "Invalid refresh token" };
    }
    // lấy thông tin user
    const [[result]] = await pool.execute(
      "SELECT * FROM users WHERE user_id = ?",
      [decoded.user_id]
    );

    // tạo accesstoken mới
    const accessToken = generateAccessToken(decoded.user_id);
    // trả về kq
    return {
      status: 200,
      message: "Refresh token successfully",
      accessToken: accessToken,
      user_info: {
        user_id: result.user_id,
        username: result.username,
        email: result.email,
        avatar: result.avatar,
        room_id: result.room_id,
      },
    };
  } catch (error) {
    // trả về status và kq
    return { status: 500, message: error.message };
  }
};
