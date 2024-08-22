const productRoutes = require("express").Router();
const productController = require("../controllers/product.controller");

productRoutes.get("/", productController.getAll);
productRoutes.get("/:id", productController.getOne);
productRoutes.delete("/delete/:id", productController.deleteOne);
productRoutes.delete("/delete-all", productController.deleteAll);
productRoutes.post("/create", productController.createProduct);

module.exports = { productRoutes };
