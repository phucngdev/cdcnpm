const productRoutes = require("express").Router();
const productController = require("../controllers/product.controller");
const verifyToken = require("../middlewares/verifyToken");

productRoutes.get("/", productController.getAll);
productRoutes.get("/detail/:id", productController.getOne);
productRoutes.get(
  "/detail/admin/:id",
  verifyToken.verifyTokenHandleAdmin,
  productController.getOneForUpdate
);
productRoutes.delete(
  "/delete/:id",
  verifyToken.verifyTokenHandleAdmin,
  productController.deleteOne
);
productRoutes.delete(
  "/delete-all",
  verifyToken.verifyTokenHandleAdmin,
  productController.deleteAll
);
productRoutes.post(
  "/create",
  verifyToken.verifyTokenHandleAdmin,
  productController.createProduct
);
productRoutes.put(
  "/update/:id",
  verifyToken.verifyTokenHandleAdmin,
  productController.updateProduct
);
productRoutes.get("/search", productController.searchProduct);

module.exports = { productRoutes };
