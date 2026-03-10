const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true, minlength: 6 },
    role: {
      type: String,
      enum: ["manager", "salesAgent", "director"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model("users", userSchema);

module.exports = { UserModel };
