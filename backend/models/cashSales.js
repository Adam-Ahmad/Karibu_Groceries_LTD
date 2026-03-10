const mongoose = require("mongoose");

// Cash Sales Schema
const cashSalesSchema = new mongoose.Schema(
  {
    produceName: { type: String, required: true, trim: true },
    tonnageSold: { type: Number, required: true, min: 1 },
    amountPaid: { type: Number, required: true, min: 10000 },
    buyerName: { type: String, required: true, minlength: 2, trim: true },
    salesAgentName: { type: String, required: true, minlength: 2, trim: true },
    branch: { type: String, required: true, enum: ["Maganjo", "Matugga"] },
    date: { type: Date, required: true },
    time: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const CashSalesModel = mongoose.model("cash_sales", cashSalesSchema);

module.exports = { CashSalesModel };
