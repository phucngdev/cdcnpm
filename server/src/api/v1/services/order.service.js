const pool = require("../../../config/database");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const CryptoJS = require("crypto-js");
const axios = require("axios");
const qs = require("qs");
const emailService = require("./mail.service");

module.exports.createOrderService = async (body) => {
  try {
    const orderId = uuidv4();

    await pool.execute(
      "INSERT INTO orders (order_id, user_id, transaction, total, payment_status, status, address, city, district, ward, phone, email, note, username) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        orderId,
        body.user_id,
        body.transaction,
        body.total,
        body.transaction === "zalopay" ? "1" : "0",
        "0",
        body.address,
        body.city,
        body.district,
        body.ward,
        body.phone,
        body.email,
        body.note,
        body.username,
      ]
    );

    const orderItems = body.order_items.map((item) => [
      uuidv4(),
      orderId,
      item.product_id,
      item.color_size_id,
      item.quantity,
      item.price,
    ]);

    await pool.query(
      "INSERT INTO order_details (order_detail_id, order_id, product_id, color_size_id, quantity, price) VALUES ?",
      [orderItems]
    );

    emailService.sendMailNewOrder(orderId);

    return {
      status: 201,
      message: "Order created successfully",
    };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.createOrderWithZalopayService = async (body, user_id) => {
  const items =
    body.order_items.length > 0
      ? body.order_items.map((item) => ({
          product_id: item.product_id,
          color_size_id: item.color_size_id,
          quantity: item.quantity,
          price: item.price,
        }))
      : [{}];

  try {
    config = {
      app_id: "2554", // app_id của ngừoi nhận tiền (ngừoi đăng ký zalopay)
      key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
      key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
      endpoint: "https://sb-openapi.zalopay.vn/v2/create", // chạy với dev
    };
    const embed_data = {
      redirecturl: "http://localhost:5173/trang-thai-thanh-toan",
      phone: body.phone,
      username: body.username,
      email: body.email,
      city: body.city,
      district: body.district,
      ward: body.ward,
      address: body.address,
      note: body.note,
      user_id: user_id,
    };

    const transID = Math.floor(Math.random() * 1000000);
    const order = {
      app_id: config.app_id,
      app_trans_id: `${moment().format("YYMMDD")}_${transID}`,
      app_user: "user123",
      app_time: Date.now(),
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: body.total,
      description: `Teelab - Payment for the order #${transID}`,
      bank_code: "",
      callback_url:
        "https://35ab-1-53-37-95.ngrok-free.app/api/v1/order/zalopay/callback", // sau khi thanh toán sẽ gọi đến api này // localhost 3000
    };

    const data =
      config.app_id +
      "|" +
      order.app_trans_id +
      "|" +
      order.app_user +
      "|" +
      order.amount +
      "|" +
      order.app_time +
      "|" +
      order.embed_data +
      "|" +
      order.item;
    order["mac"] = CryptoJS.HmacSHA256(data, config.key1).toString();
    const result = await axios.post(config.endpoint, null, {
      params: order,
    });
    return { ...result.data, app_trans_id: order.app_trans_id };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.zalopayCallBackService = async (body) => {
  try {
    let result = {};
    let dataStr = body.data;
    let reqMac = body.mac;

    config = {
      app_id: "2554", // app_id của ngừoi nhận tiền (ngừoi đăng ký zalopay)
      key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
      key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
      endpoint: "https://sb-openapi.zalopay.vn/v2/create", // chạy với dev
    };

    let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();

    // kiểm tra callback hợp lệ (đến từ ZaloPay server)
    if (reqMac !== mac) {
      // callback không hợp lệ
      result["return_code"] = -1;
      result["return_message"] = "mac not equal";
    } else {
      // thanh toán thành công
      let dataJson = JSON.parse(dataStr);
      const option = JSON.parse(dataJson.item);
      const embed_data = JSON.parse(dataJson.embed_data);

      const data = {
        user_id: embed_data.user_id,
        transaction: "zalopay",
        total: dataJson.amount,
        payment_status: "1",
        status: "0",
        address: embed_data.address,
        city: embed_data.city,
        district: embed_data.district,
        ward: embed_data.ward,
        phone: embed_data.phone,
        email: embed_data.email,
        note: embed_data.note,
        username: embed_data.username,
        order_items: option,
      };
      console.log("tạo data");

      await module.exports.createOrderService(data);
      console.log("tạo đơn thành công");

      result["return_code"] = 1;
      result["return_message"] = "success";
    }
    return result;
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.zalopayCheckStatusService = async (app_trans_id) => {
  try {
    config = {
      app_id: "2554", // app_id của ngừoi nhận tiền (ngừoi đăng ký zalopay)
      key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
      key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
      endpoint: "https://sb-openapi.zalopay.vn/v2/create", // chạy với dev
    };
    let postData = {
      app_id: config.app_id,
      app_trans_id,
    };
    let data =
      postData.app_id + "|" + postData.app_trans_id + "|" + config.key1;
    postData["mac"] = CryptoJS.HmacSHA256(data, config.key1).toString();

    let postConfig = {
      method: "post",
      url: "https://sb-openapi.zalopay.vn/v2/query",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify(postData),
    };
    const result = await axios(postConfig);

    return result.data;
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.getAllOrderByUserService = async (user_id) => {
  try {
    const [orders] = await pool.execute(
      "SELECT * FROM orders WHERE user_id = ?",
      [user_id]
    );

    if (orders.length === 0) {
      return { status: 404, message: "No orders found" };
    }

    const orderIds = orders.map((order) => order.order_id);

    if (orderIds.length === 0) {
      return { status: 200, orders: orders, orderDetails: [] };
    }

    const placeholders = orderIds.map(() => "?").join(", ");
    const [orderDetails] = await pool.execute(
      `
      SELECT 
        od.*, 
        p.product_name, p.thumbnail, p.price AS product_price,
        cs.color_id, cs.size_id, 
        c.color_name, 
        s.size_name
       FROM order_details od
       JOIN products p ON od.product_id = p.product_id
       JOIN color_size cs ON od.color_size_id = cs.color_size_id
       JOIN colors c ON cs.color_id = c.color_id
       JOIN sizes s ON cs.size_id = s.size_id
       WHERE od.order_id IN (${placeholders})`,
      orderIds
    );

    const ordersWithDetails = orders.map((order) => ({
      ...order,
      details: orderDetails
        .filter((detail) => detail.order_id === order.order_id)
        .map((detail) => ({
          order_detail_id: detail.order_detail_id,
          order_id: detail.order_id,
          quantity: detail.quantity,
          product: {
            product_id: detail.product_id,
            product_name: detail.product_name,
            thumbnail: detail.thumbnail,
            price: detail.product_price,
          },
          color_size: {
            color_id: detail.color_id,
            size_id: detail.size_id,
            color_name: detail.color_name,
            size_name: detail.size_name,
          },
        })),
    }));

    return {
      status: 200,
      orders: ordersWithDetails,
    };
  } catch {
    return { status: 500, message: "Error retrieving order items" };
  }
};

module.exports.getOneOrderService = async (user_id, order_id) => {
  try {
    const [[order]] = await pool.execute(
      "SELECT * FROM orders WHERE user_id =? AND order_id =?",
      [user_id, order_id]
    );

    if (!order) {
      return { status: 404, message: "Order not found" };
    }

    const [orderItems] = await pool.execute(
      `SELECT 
        od.order_detail_id, 
        p.product_name, 
        cs.color_name, 
        cs.size_name, 
        od.quantity, 
        od.price 
      FROM order_details od 
      JOIN products p ON od.product_id = p.product_id 
      JOIN color_size cs ON od.color_size_id = cs.color_size_id 
      WHERE od.order_id = ?`,
      [order_id]
    );

    return {
      status: 200,
      order: order,
      order_items: orderItems,
    };
  } catch {
    return { status: 500, message: "Error retrieving order" };
  }
};
