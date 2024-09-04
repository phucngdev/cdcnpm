const cartRoutes = require("express").Router();
const cartController = require("../controllers/cart.controller");
const verifyToken = require("../middlewares/verifyToken");

cartRoutes.post("/add", verifyToken.verifyToken, cartController.addToCart);
cartRoutes.get("/", verifyToken.verifyToken, cartController.getCartById);
cartRoutes.delete(
  "/:id",
  verifyToken.verifyToken,
  cartController.deleteCartItem
);

module.exports = { cartRoutes };
