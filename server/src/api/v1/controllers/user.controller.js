const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");

// lấy tất cả user
module.exports.getAllUser = async (req, res) => {
  try {
    // giải mã token lấy id admin
    const decoded = jwt.verify(
      req.cookies.accessToken,
      process.env.JWT_ACCESS_KEY
    );
    // gọi đến service lấy tất cả user gửi theo id admin
    const result = await userService.getAllUserService(decoded.user_id);
    // trả về status và kết quả
    return res.status(200).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: error.message });
  }
};

// update trạng thái của user (hoạt động | bị chặn)
module.exports.updateStatusUser = async (req, res) => {
  try {
    // gọi đến service gửi theo user id và trạng thái mới
    const result = await userService.updateStatusUserService(
      req.params.id,
      req.params.status
    );
    // trả về status và kết quả
    return res.status(200).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: error.message });
  }
};
