const { model } = require("mongoose");
const productSchema = require("../schema/product.schema");

const productModel = model("product", productSchema);

module.exports = productModel;
