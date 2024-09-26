const statisticRoutes = require("express").Router();
const statisticController = require("../controllers/statistics.controller");
const verifyToken = require("../middlewares/verifyToken");

statisticRoutes.get(
  "/dashboard",
  verifyToken.verifyTokenHandleAdmin,
  statisticController.dashboard
);

module.exports = { statisticRoutes };
