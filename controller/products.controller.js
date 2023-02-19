const { default: axios } = require("axios");
const productModel = require("../database/models/product.model");

axios;
module.exports.create_product = async (req, res, next) => {
  try {
    const new_product = await productModel.create(req.body);
    res.json({
      status: "success",
      data: new_product,
      message: "Product created successfully✅",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "Error",
      data: null,
      message: "Something wrong with crete product, please try again",
    });
  }
};
module.exports.get_all_product = async (req, res, next) => {
  try {
    // here .select taken object in which whatever we want to set as data in the response we make it as 1 and other like 0 
    const all_products = await productModel.find().select({
      title: 1,
      price: 1,
      _id: 1,
      thumbnail: 1,
    });
    res.json({
      status: "success",
      data_length: all_products.length,
      data: all_products,
      message: "Product pulled successfully✅",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      data: null,
      message: "Error with get all products, please try again",
    });
  }
};
module.exports.get_single_product = async (req, res, next) => {
  try {
    const product_id = req.params.id;
    // console.log(product_id);
    const single_product = await productModel.findById(product_id);
    res.json({
      status: "success",
      data_length: single_product.length,
      data: single_product,
      message: "Product pulled successfully✅",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      data: null,
      message: "Error with get single product, please try again",
    });
  }
};
module.exports.update_product = async (req, res, next) => {
  try {
    const product_id = req.params.id;
    const product_to_be_updated = await productModel.findByIdAndUpdate(
      product_id,
      req.body,
      { new: true }
    );
    res.json({
      status: "success",
      data: product_to_be_updated,
      message: "Product updated successfully✅",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      data: null,
      message: "Error with updating product, please try again",
    });
  }
};
module.exports.delete_product = async (req, res, next) => {
  try {
    const product_id = req.params.id;
    const product_to_be_deleted = await productModel.findByIdAndDelete(
      product_id
    );
    res.json({
      status: "success",
      data: product_to_be_deleted,
      message: "Product deleted successfully✅",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      data: null,
      message: "Error with deleting product, please try again",
    });
  }
};
