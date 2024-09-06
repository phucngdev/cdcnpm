const pool = require("../../../config/database");
const { v4: uuidv4 } = require("uuid");

module.exports.getAllService = async (page, limit) => {
  try {
    if (page != 0 && limit != 0) {
      const offset = (page - 1) * limit;

      const [totalRows] = await pool.execute(`
      SELECT COUNT(*) AS total FROM products
    `);
      const totalItems = totalRows[0].total;
      const totalPages = Math.ceil(totalItems / limit);

      const [products] = await pool.execute(
        `
      SELECT 
        p.product_id, 
        p.product_name, 
        p.thumbnail, 
        p.thumbnail_hover, 
        p.images, 
        p.discount, 
        p.description_image, 
        p.description, 
        p.price, 
        p.status, 
        c.category_name AS category
      FROM products p
      JOIN categories c ON p.category_id = c.category_id
      LIMIT ? OFFSET ?`,
        [limit, offset]
      );

      const productPromises = products.map(async (product) => {
        const [colorSizes] = await pool.execute(
          `
        SELECT 
          cs.color_size_id, 
          co.color_name, 
          co.image AS color_image, 
          s.size_name, 
          s.quantity
        FROM color_size cs
        JOIN colors co ON cs.color_id = co.color_id
        JOIN sizes s ON cs.size_id = s.size_id
        WHERE cs.product_id = ?`,
          [product.product_id]
        );

        const optionsMap = colorSizes.reduce((acc, cs) => {
          if (!acc[cs.color_name]) {
            acc[cs.color_name] = {
              color_name: cs.color_name,
              image: cs.color_image,
              sizes: [],
            };
          }
          acc[cs.color_name].sizes.push({
            size_name: cs.size_name,
            quantity: cs.quantity,
          });
          return acc;
        }, {});

        const options = Object.values(optionsMap);

        return {
          product_id: product.product_id,
          product_name: product.product_name,
          category: product.category,
          thumbnail: product.thumbnail,
          thumbnail_hover: product.thumbnail_hover,
          images: JSON.parse(product.images),
          discount: product.discount,
          description_image: product.description_image,
          description: product.description,
          price: product.price,
          status: product.status,
          option: options,
        };
      });

      const result = await Promise.all(productPromises);
      return {
        products: result,
        totalItems,
        totalPages,
        page,
        limit,
      };
    } else {
      const [products] = await pool.execute(`
      SELECT 
        p.product_id, 
        p.product_name, 
        p.thumbnail, 
        p.thumbnail_hover, 
        p.images, 
        p.discount, 
        p.description_image, 
        p.description, 
        p.price, 
        p.status, 
        c.category_name AS category
      FROM products p
      JOIN categories c ON p.category_id = c.category_id
    `);

      const productPromises = products.map(async (product) => {
        const [colorSizes] = await pool.execute(
          `
        SELECT 
          cs.color_size_id, 
          co.color_name, 
          co.image AS color_image, 
          s.size_name, 
          s.quantity
        FROM color_size cs
        JOIN colors co ON cs.color_id = co.color_id
        JOIN sizes s ON cs.size_id = s.size_id
        WHERE cs.product_id = ?
      `,
          [product.product_id]
        );

        const optionsMap = colorSizes.reduce((acc, cs) => {
          if (!acc[cs.color_name]) {
            acc[cs.color_name] = {
              color_name: cs.color_name,
              image: cs.color_image,
              sizes: [],
            };
          }
          acc[cs.color_name].sizes.push({
            size_name: cs.size_name,
            quantity: cs.quantity,
          });
          return acc;
        }, {});

        const options = Object.values(optionsMap);

        return {
          product_id: product.product_id,
          product_name: product.product_name,
          category: product.category,
          thumbnail: product.thumbnail,
          thumbnail_hover: product.thumbnail_hover,
          images: JSON.parse(product.images),
          discount: product.discount,
          description_image: product.description_image,
          description: product.description,
          price: product.price,
          status: product.status,
          option: options,
        };
      });

      const result = await Promise.all(productPromises);
      return {
        products: result,
        totalItems: result.length,
        totalPages: 0,
        page: 0,
        limit: 0,
      };
    }
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.getOneService = async (id) => {
  try {
    const [[product]] = await pool.execute(
      `
      SELECT 
        p.product_id, 
        p.product_name, 
        p.thumbnail, 
        p.thumbnail_hover, 
        p.images, 
        p.discount, 
        p.description_image, 
        p.description, 
        p.price, 
        p.status, 
        c.category_id,
        c.category_name,
        c.path
      FROM products p
      JOIN categories c ON p.category_id = c.category_id
      WHERE p.product_id = ?
    `,
      [id]
    );

    if (!product) {
      return { status: 404, message: "Product not found" };
    }

    const [colorSize] = await pool.execute(
      `SELECT 
          cs.color_size_id,
          cs.product_id,
          cs.color_id,
          c.color_name,
          c.image,
          cs.size_id,
          s.size_name,
          s.quantity
      FROM color_size cs
      JOIN colors c ON cs.color_id = c.color_id
      JOIN sizes s ON cs.size_id = s.size_id
      WHERE cs.product_id = ?`,
      [id]
    );

    return {
      product_id: product.product_id,
      product_name: product.product_name,
      thumbnail: product.thumbnail,
      thumbnail_hover: product.thumbnail_hover,
      images: JSON.parse(product.images),
      status: product.status,
      discount: product.discount,
      description_image: product.description_image,
      description: product.description,
      price: product.price,
      category: {
        category_id: product.category_id,
        path: product.path,
        category_name: product.category_name,
      },
      colorSize,
    };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.updateProductService = async (id, body) => {
  try {
    return { status: 200, message: "Product updated successfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.deleteOneService = async (id) => {
  try {
    await pool.execute("DELETE FROM products WHERE product_id = ?", [id]);
    return { message: "Product deleted successfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.deleteAllService = async () => {
  try {
    await pool.execute("TRUNCATE TABLE products");
    return { message: "All products deleted successfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.createProductService = async (body) => {
  try {
    const productId = uuidv4(); // Tạo ID sản phẩm mới
    await pool.execute(
      `INSERT INTO products (
        product_id, product_name, thumbnail, thumbnail_hover, images, discount, description_image, description, price, status, category_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        productId,
        body.product_name,
        body.thumbnail,
        body.thumbnail_hover,
        JSON.stringify(body.images),
        body.discount,
        body.description_image,
        body.description,
        body.price,
        body.status,
        body.category,
      ]
    );

    for (const option of body.option) {
      const colorId = uuidv4();
      await pool.execute(
        `INSERT INTO colors (color_id, color_name, image) VALUES (?, ?, ?)`,
        [colorId, option.color_name, option.image]
      );

      for (const size of option.sizes) {
        const sizeId = uuidv4();
        await pool.execute(
          `INSERT INTO sizes (size_id, size_name, quantity) VALUES (?, ?, ?)`,
          [sizeId, size.size_name, size.quantity]
        );
        await pool.execute(
          `INSERT INTO color_size (color_size_id, product_id, color_id, size_id) VALUES (?, ?, ?, ?)`,
          [uuidv4(), productId, colorId, sizeId]
        );
      }
    }
    return { status: 201, message: "Product created successfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.searchProductService = async (q) => {
  try {
    const [products] = await pool.execute(
      `SELECT 
        p.product_id, 
        p.product_name, 
        p.thumbnail,
        p.discount, 
        p.price, 
        p.status, 
        c.category_name AS category
      FROM products p
      JOIN categories c ON p.category_id = c.category_id
      WHERE p.product_name LIKE ? OR c.category_name LIKE ?`,
      [`%${q}%`, `%${q}%`]
    );

    if (!products.length) {
      return { status: 404, message: "No products found" };
    }
    return products;
  } catch {
    return { status: 500, message: "Error searching products" };
  }
};
