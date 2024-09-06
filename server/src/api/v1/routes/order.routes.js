const orderRoutes = require("express").Router();
const orderController = require("../controllers/order.controller");

orderRoutes.post("/create", orderController.createOrder);
orderRoutes.get("/user/:id", orderController.getAllOrderByUser);
orderRoutes.post("/create/zalopay", orderController.createOrderWithZalopay);
orderRoutes.post("/zalopay/callback", orderController.zalopayCallBack);
orderRoutes.get(
  "/zalopay/check-status/:id",
  orderController.zalopayCheckStatus
);

module.exports = { orderRoutes };
