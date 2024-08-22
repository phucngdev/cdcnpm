module.exports.register = async (req, res) => {
  try {
    const result = await userService.registerService(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
