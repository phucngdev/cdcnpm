module.exports.sendMessage = async (req, res) => {
  try {
    const result = await sendMessageService(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
