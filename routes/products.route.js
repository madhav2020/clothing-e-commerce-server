const axios = require("axios");
const express = require("express");
const {
  create_product,
  get_all_product,
  get_single_product,
  update_product,
  delete_product,
} = require("../controller/products.controller");
const productModel = require("../database/models/product.model");

const products_routes = express.Router();

// fetching the dummy data and save it in our DB
// products_routes.post("/set/products", async (req, res, next) => {
//   const response = await axios.get("https://dummyjson.com/products");

//   const savedProducts = await productModel.insertMany(response.data.products);

//   console.log("i am products/hello", response.data.products);
//   res.json({
//     status: "success",
//     data_length: savedProducts.length,
//     data: savedProducts,
//     message: "products created successfully",
//   });
// });

products_routes.post("/create_product", create_product);
products_routes.get("/get_all_product", get_all_product);
products_routes.get("/get_single_product/:id", get_single_product);
products_routes.patch("/update_product/:id", update_product);
products_routes.delete("/delete_product/:id", delete_product);

module.exports = products_routes;
