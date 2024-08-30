const authRoutes = require("express").Router();
const authController = require("../controllers/auth.controller");
const authValidate = require("../validations/auth.validate");
const verifyEmail = require("../middlewares/verifyEmail");

authRoutes.post(
  "/register",
  authValidate.authValidate,
  verifyEmail.verifyEmailWithGoogle,
  verifyEmail.checkEmailExists,
  authController.register
);
authRoutes.post("/login", authValidate.authValidate, authController.login);

module.exports = { authRoutes };
