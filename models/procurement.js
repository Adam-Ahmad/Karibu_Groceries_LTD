const mongoose = require("mongoose");

// procurement schema
const procurementSchema = new mongoose.Schema(
  {
    produceName: { type: String, required: true, trim: true },
    produceType: { type: String, required: true, minlength: 2, trim: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    tonnageKg: { type: Number, required: true, min: 100 },
    costUgx: { type: Number, required: true, min: 10000 },
    dealerName: { type: String, required: true, minlength: 2, trim: true },
    branch: { type: String, required: true, enum: ["Maganjo", "Matugga"] },
    dealerContact: { type: String, required: true },
    sellingPrice: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

const ProcurementModel = mongoose.model("procurement", procurementSchema);

module.exports = { ProcurementModel };
