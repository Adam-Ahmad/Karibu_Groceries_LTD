const express = require("express");
const { getCurrentStockController } = require("../controllers/stock");

const route = express.Router();

route.get("/getCurrentStock", getCurrentStockController);

module.exports = { route };
