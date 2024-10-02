const productService = require("../services/product.service");

module.exports.getAll = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const result = await productService.getAllService(page, limit);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.getOne = async (req, res) => {
  try {
    const result = await productService.getOneService(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.getOneForUpdate = async (req, res) => {
  try {
    const result = await productService.getOneForUpdateService(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    await productService.deleteOneService(id);
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.deleteAll = async (req, res) => {
  try {
    await productService.deleteAllService();
    return res
      .status(200)
      .json({ message: "All products deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.createProduct = async (req, res) => {
  try {
    const result = await productService.createProductService(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const result = await productService.updateProductService(
      req.params.id,
      req.body
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.searchProduct = async (req, res) => {
  try {
    const result = await productService.searchProductService(req.query.q);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.updateStatusProduct = async (req, res) => {
  try {
    const result = await productService.updateStatusProductService(
      req.params.id,
      req.body.status
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.getOneProductImport = async (req, res) => {
  try {
    const result = await productService.getOneProductImportService(
      req.params.id
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.importQuantityProduct = async (req, res) => {
  try {
    const result = await productService.importQuantityProductService(
      req.params.id,
      req.body
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.addNewSize = async (req, res) => {
  try {
    const result = await productService.addNewSizeService(
      req.params.id,
      req.body
    );
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.deleteSize = async (req, res) => {
  try {
    const result = await productService.deleteSizeService(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
