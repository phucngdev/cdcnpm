const cartService = require("../services/cart.service");
const jwt = require("jsonwebtoken");

module.exports.addToCart = async (req, res) => {
  try {
    const token = await req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);
    const result = await cartService.addToCartService(
      decoded.user_id,
      req.body
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.getCartById = async (req, res) => {
  try {
    const result = await cartService.getCartByIdService(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
