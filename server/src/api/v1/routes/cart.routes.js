const cartRoutes = require("express").Router();
const cartController = require("../controllers/cart.controller");
const verifyToken = require("../middlewares/verifyToken");

cartRoutes.post("/add/:id", verifyToken.verifyToken, cartController.addToCart);
cartRoutes.get("/:id", cartController.getCartById);
cartRoutes.put("/update", verifyToken.verifyToken, cartController.updateCart);
cartRoutes.delete(
  "/:id",
  verifyToken.verifyToken,
  cartController.deleteCartItem
);

module.exports = { cartRoutes };
