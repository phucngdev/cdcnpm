const productRoutes = require("express").Router();
const productController = require("../controllers/product.controller");
const middleware = require("../middlewares/verifyToken");

productRoutes.get("/", productController.getAll);
productRoutes.get("/detail/:id", productController.getOne);
productRoutes.get("/detail/admin/:id", productController.getOneForUpdate);
productRoutes.delete("/delete/:id", productController.deleteOne);
productRoutes.delete("/delete-all", productController.deleteAll);
productRoutes.post(
  "/create",
  middleware.verifyTokenHandleAdmin,
  productController.createProduct
);
productRoutes.put("/update/:id", productController.updateProduct);
productRoutes.get("/search", productController.searchProduct);

module.exports = { productRoutes };
