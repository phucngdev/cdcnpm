const productRoutes = require("express").Router();
const productController = require("../controllers/product.controller");
const middleware = require("../middlewares/verifyToken");

productRoutes.get("/", productController.getAll);
productRoutes.get("/:id", productController.getOne);
productRoutes.delete("/delete/:id", productController.deleteOne);
productRoutes.delete("/delete-all", productController.deleteAll);
productRoutes.post(
  "/create",
  middleware.verifyTokenHandleAdmin,
  productController.createProduct
);
productRoutes.put("/update/:id", productController.updateProduct);

module.exports = { productRoutes };
