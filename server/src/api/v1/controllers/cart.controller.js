const cartService = require("../services/cart.service");
const jwt = require("jsonwebtoken");

// thêm sản phẩm vào giỏ hàng
module.exports.addToCart = async (req, res) => {
  try {
    // gọi service gửi theo user id và body
    const result = await cartService.addToCartService(req.params.id, req.body);
    // trả về status và kết quả
    return res.status(200).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: error.message });
  }
};

// lấy thông tin giỏ hàng của user
module.exports.getCartById = async (req, res) => {
  try {
    // gọi tới service gửi theo id user
    const result = await cartService.getCartByIdService(req.params.id);
    // trả về status và kết quả
    return res.status(200).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: error.message });
  }
};

//
module.exports.updateCart = async (req, res) => {
  try {
    // gọi tới service gửi theo body
    const result = await cartService.updateCartService(req.body);
    // trả về status và kết quả
    return res.status(200).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: error.message });
  }
};

// xoá sản phẩm khỏi giỏ hàng
module.exports.deleteCartItem = async (req, res) => {
  try {
    // gọi tới service gửi theo id_cart_item sản phẩm
    const result = await cartService.deleteCartItemService(req.params.id);
    // trả về status và kết quả
    return res.status(200).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: error.message });
  }
};
