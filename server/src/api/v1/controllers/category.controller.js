const categoryService = require("../services/category.service");

module.exports.createCategory = async (req, res) => {
  try {
    const result = await categoryService.createCategoryService(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.getAllCategory = async (req, res) => {
  try {
    const result = await categoryService.getAllCategoryService();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await categoryService.deleteCategoryService(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await categoryService.updateCategoryService(id, req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
