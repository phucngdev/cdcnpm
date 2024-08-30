const categoryRoutes = require("express").Router();
const categoryController = require("../controllers/category.controller");
const verifyToken = require("../middlewares/verifyToken");

categoryRoutes.post(
  "/create",
  verifyToken.verifyTokenHandleAdmin,
  categoryController.createCategory
);
categoryRoutes.get("/", categoryController.getAllCategory);
categoryRoutes.delete(
  "/delete/:id",
  verifyToken.verifyTokenHandleAdmin,
  categoryController.deleteCategory
);
categoryRoutes.put(
  "/update/:id",
  verifyToken.verifyTokenHandleAdmin,
  categoryController.updateCategory
);

module.exports = { categoryRoutes };
