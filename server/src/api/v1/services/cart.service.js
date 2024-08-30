const pool = require("../../../config/database");
const { v4: uuidv4 } = require("uuid");

module.exports.addToCartService = async (id, body) => {
  try {
    const [[user]] = await pool.execute(
      "SELECT * FROM users WHERE user_id = ?",
      [id]
    );
    if (!user) {
      return { status: 404, message: "User not found" };
    }

    const [[item]] = await pool.execute(
      "SELECT * FROM cartItems WHERE product_id = ? AND color_size_id = ?",
      [body.product_id, body.color_size_id]
    );

    if (item) {
      const updatedQuantity = item.quantity + body.quantity;
      await pool.execute(
        "UPDATE cartItems SET quantity = ? WHERE cart_item_id = ?",
        [updatedQuantity, item.cart_item_id]
      );
      return {
        status: 201,
        message: "Update quantity in cart successfully",
      };
    }

    const cartItemId = uuidv4();
    await pool.execute(
      "INSERT INTO cartItems (cart_item_id, cart_id, product_id, color_size_id, quantity) VALUES (?, ?, ?, ?, ?)",
      [
        cartItemId,
        user.cart_id,
        body.product_id,
        body.color_size_id,
        body.quantity,
      ]
    );
    return {
      status: 201,
      message: "Add to cart successfully",
    };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.getCartByIdService = async (id) => {
  try {
    const [[user]] = await pool.execute(
      "SELECT * FROM users WHERE user_id =?",
      [id]
    );

    if (!user) {
      return { status: 404, message: "User not found" };
    }
    const [cartRows] = await pool.execute(
      `
        SELECT 
            c.cart_id,
            c.created_at AS cart_created_at,
            c.update_at AS cart_updated_at,
            ci.cart_item_id,
            ci.quantity,
            ci.created_at AS item_created_at,
            ci.update_at AS item_updated_at,
            p.product_id,
            p.product_name,
            p.description,
            cs.color_size_id,
            clr.color_name,
            sz.size_name
        FROM 
            carts c
        JOIN 
            cartItems ci ON c.cart_id = ci.cart_id
        JOIN 
            products p ON ci.product_id = p.product_id
        JOIN 
            color_size cs ON ci.color_size_id = cs.color_size_id
        JOIN 
            colors clr ON cs.color_id = clr.color_id
        JOIN 
            sizes sz ON cs.size_id = sz.size_id
        WHERE 
            c.cart_id = ?
      `,
      [user.cart_id]
    );

    // Check if cart exists
    if (cartRows.length === 0) {
      return { status: 404, message: "Cart not found" };
    }

    // Group the items by cart and prepare the response
    const cart = {
      cart_id: cartRows[0].cart_id,
      created_at: cartRows[0].cart_created_at,
      updated_at: cartRows[0].cart_updated_at,
      items: cartRows.map((row) => ({
        cart_item_id: row.cart_item_id,
        quantity: row.quantity,
        product: {
          product_id: row.product_id,
          name: row.product_name,
          description: row.product_description,
        },
        color_size: {
          color_size_id: row.color_size_id,
          color_name: row.color_name,
          size_name: row.size_name,
        },
        created_at: row.item_created_at,
        updated_at: row.item_updated_at,
      })),
    };
    return cart;
  } catch (error) {
    return { status: 500, message: error.message };
  }
};
