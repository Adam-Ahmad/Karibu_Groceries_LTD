const { CashSalesModel } = require("../models/cashSales");

/**
 * Add Cash Sales Controller is used to add cash sales
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware
 * @returns {Object} - Response object
 */
const addCashSalesController = async (req, res) => {
  try {
    const {
      produceName,
      tonnageSold,
      amountPaid,
      buyerName,
      salesAgentName,
      branch,
      date,
      time,
    } = req.body;

    if (
      !produceName ||
      !tonnageSold ||
      !amountPaid ||
      !buyerName ||
      !salesAgentName ||
      !branch ||
      !date ||
      !time
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const cashSales = new CashSalesModel(req.body);
    await cashSales.save();

    res.status(201).json({ cashSales });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Get Cash Sales Controller is used to get all cash sales
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware
 * @returns {Object} - Response object
 */
const getCashSalesController = async (req, res) => {
  try {
    // get all cash sales
    const cashSales = await CashSalesModel.find();
    res.status(200).json({ cashSales });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: "Internal Server Error" });
  }
};

module.exports = { addCashSalesController, getCashSalesController };
