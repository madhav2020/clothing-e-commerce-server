const { Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "super_admin", "merchant"],
      default: "user",
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = userSchema;
