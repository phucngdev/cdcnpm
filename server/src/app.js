const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const { productRoutes } = require("./api/v1/routes/product.routes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("common"));
app.use(express.json());

// route
app.use("/api/v1/product", productRoutes);

module.exports = app;
