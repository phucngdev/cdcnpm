const categoryRoutes = require("express").Router();
const categoryController = require("../controllers/category.controller");

categoryRoutes.post("/create", categoryController.createCategory);
categoryRoutes.get("/", categoryController.getAllCategory);
categoryRoutes.delete("/delete/:id", categoryController.deleteCategory);
categoryRoutes.put("/update/:id", categoryController.updateCategory);

module.exports = { categoryRoutes };
