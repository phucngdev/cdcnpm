const pool = require("../../../config/database");

module.exports.getAllService = async () => {
  try {
    const [result] = await pool.execute("SELECT * FROM products");
    return result;
  } catch (error) {
    throw new Error("Server error");
  }
};

module.exports.getOneService = async (id) => {
  try {
    const [[result]] = await pool.execute(
      "SELECT * FROM products WHERE product_id = ?",
      [id]
    );
    return result;
  } catch (error) {
    throw new Error("Server error");
  }
};

module.exports.deleteOneService = async (id) => {
  try {
    await pool.execute("DELETE FROM products WHERE product_id = ?", [id]);
    return { message: "Product deleted successfully" };
  } catch (error) {
    throw new Error("Server error");
  }
};

module.exports.deleteAllService = async () => {
  try {
    await pool.execute("TRUNCATE TABLE products");
    return { message: "All products deleted successfully" };
  } catch (error) {
    throw new Error("Server error");
  }
};

module.exports.createProductService = async (body) => {
  try {
  } catch (error) {
    throw new Error("Server error");
  }
};
