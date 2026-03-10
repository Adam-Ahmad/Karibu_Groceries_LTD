const { ProcurementModel } = require("../models/procurement");
const { CashSalesModel } = require("../models/cashSales");
const { CreditSalesModel } = require("../models/creditSales");

const getCurrentStockController = async (req, res) => {
  try {
    const [procurements, cashSales, creditSales] = await Promise.all([
      ProcurementModel.find({}),
      CashSalesModel.find({}),
      CreditSalesModel.find({}),
    ]);

    const stock = {};

    procurements.forEach((procurement) => {
      const { produceName, tonnageKg } = procurement;
      if (stock[produceName]) {
        stock[produceName] += tonnageKg;
      } else {
        stock[produceName] = tonnageKg;
      }
    });

    cashSales.forEach((sale) => {
      const { produceName, tonnageSold } = sale;
      if (stock[produceName]) {
        stock[produceName] -= tonnageSold;
      } else {
        stock[produceName] = -tonnageSold;
      }
    });

    creditSales.forEach((sale) => {
      const { produce, tonnageKg } = sale;
      if (stock[produce]) {
        stock[produce] -= tonnageKg;
      } else {
        stock[produce] = -tonnageKg;
      }
    });

    res.status(200).json({ stock });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = { getCurrentStockController };
