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

module.exports.getAllOrder = async (req, res) => {
  try {
    const { page, limit, status } = req.query;
    const result = await orderService.getAllOrderService(page, limit, status);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.getOneOrder = async (req, res) => {
  try {
    const result = await orderService.getOneOrderService(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.createOrderWithZalopay = async (req, res) => {
  try {
    const result = await orderService.createOrderWithZalopayService(req.body);
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

module.exports.updateStatusOrder = async (req, res) => {
  try {
    const result = await orderService.updateStatusOrderService(
      req.body.status,
      req.params.id
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
