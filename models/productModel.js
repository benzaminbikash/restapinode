const mongoose = require("mongoose");

const productScheme = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: [true, "Price is required."],
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    rating: {
      type: Number,
      required: [true, "rating is required"],
    },
    company: {
      type: String,
      enum: {
        values: ["apple", "samsung", "hp", "mi"],
        message: `{VALUE} is not supported`,
      },
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Products", productScheme);

module.exports = Product;
