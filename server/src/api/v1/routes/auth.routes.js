const authRoutes = require("express").Router();
const authController = require("../controllers/auth.controller");
const authValidate = require("../validations/auth.validate");
const verifyEmail = require("../middlewares/verifyEmail");
const verifyToken = require("../middlewares/verifyToken");

authRoutes.post(
  "/register",
  authValidate.authValidate,
  verifyEmail.verifyEmailWithGoogle,
  verifyEmail.checkEmailExists,
  authController.register
);
authRoutes.post("/login", authValidate.authValidate, authController.login);
authRoutes.post(
  "/check-role",
  verifyToken.verifyTokenHandleAdmin,
  authController.checkRoleAdmin
);
authRoutes.post("/logout", verifyToken.verifyToken, authController.logout);
authRoutes.post("/refreshToken", authController.refreshToken);

module.exports = { authRoutes };
