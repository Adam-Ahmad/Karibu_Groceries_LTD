const { CashSalesModel } = require("../models/cashSales");
const { CreditSalesModel } = require("../models/creditSales");

/**
 *
 */
const getCashTotalsController = async (req, res) => {
  try {
    const cashSalesTotals = await CashSalesModel.aggregate([
      {
        $group: {
          _id: "$branch",
          totalAmountPaid: { $sum: "$amountPaid" },
          totalTonnage: { $sum: "$tonnageSold" },
        },
      },
    ]);

    res.status(200).json({ cashSalesTotals });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

const getCreditTotalsController = async (req, res) => {
  try {
    const creditSalesTotals = await CreditSalesModel.aggregate([
      {
        $group: {
          _id: "$branchName",
          totalAmountDue: { $sum: "$amountDueUgx" },
          totalTonnage: { $sum: "$tonnageKg" },
        },
      },
    ]);
    res.status(200).json({ creditSalesTotals });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

const getTotalsController = async (req, res) => {
  try {
    const cashSalesTotals = await CashSalesModel.aggregate([
      {
        $group: {
          _id: "$branch",
          totalAmountPaid: { $sum: "$amountPaid" },
          totalTonnage: { $sum: "$tonnageSold" },
        },
      },
    ]);
    const creditSalesTotals = await CreditSalesModel.aggregate([
      {
        $group: {
          _id: "$branchName",
          totalAmountDue: { $sum: "$amountDueUgx" },
          totalTonnage: { $sum: "$tonnageKg" },
        },
      },
    ]);
    res.status(200).json({ cashSalesTotals, creditSalesTotals });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

module.exports = {
  getCashTotalsController,
  getCreditTotalsController,
  getTotalsController,
};
