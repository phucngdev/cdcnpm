const orderService = require("../services/order.service");
const jwt = require("jsonwebtoken");

module.exports.createOrder = async (req, res) => {
  try {
    const result = await orderService.createOrderService(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.getAllOrderByUser = async (req, res) => {
  try {
    const result = await orderService.getAllOrderByUserService(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.createOrderWithZalopay = async (req, res) => {
  try {
    const token = await req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);
    const result = await orderService.createOrderWithZalopayService(
      req.body,
      decoded.user_id
    );
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.zalopayCallBack = async (req, res) => {
  try {
    const result = await orderService.zalopayCallBackService(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.zalopayCheckStatus = async (req, res) => {
  try {
    const result = await orderService.zalopayCheckStatusService(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
