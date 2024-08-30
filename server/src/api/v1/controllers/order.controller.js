module.exports.createOrder = async (req, res) => {
  try {
    const result = await orderService.createOrderService(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
