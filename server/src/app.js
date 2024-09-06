const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const { productRoutes } = require("./api/v1/routes/product.routes");
const { categoryRoutes } = require("./api/v1/routes/category.routes");
const { authRoutes } = require("./api/v1/routes/auth.routes");
const { cartRoutes } = require("./api/v1/routes/cart.routes");
const { orderRoutes } = require("./api/v1/routes/order.routes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("common"));
app.use(express.json());

// route
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/order", orderRoutes);

module.exports = app;
