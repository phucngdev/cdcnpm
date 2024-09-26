const statisticService = require("../services/statistics.service");

module.exports.dashboard = async (req, res) => {
  try {
    const result = await statisticService.dashboardService();
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
