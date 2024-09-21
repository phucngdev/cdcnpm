const userRoutes = require("express").Router();
const userController = require("../controllers/user.controller");
const verifyToken = require("../middlewares/verifyToken");

userRoutes.get(
  "/",
  verifyToken.verifyTokenHandleAdmin,
  userController.getAllUser
);

userRoutes.put(
  "/:id/status/:status",
  verifyToken.verifyTokenHandleAdmin,
  userController.updateStatusUser
);

module.exports = { userRoutes };
