const cartRoutes = require("express").Router();
const cartController = require("../controllers/cart.controller");
const verifyToken = require("../middlewares/verifyToken");

cartRoutes.post("/add", verifyToken.verifyToken, cartController.addToCart);
cartRoutes.get("/:id", verifyToken.verifyToken, cartController.getCartById);

module.exports = { cartRoutes };
