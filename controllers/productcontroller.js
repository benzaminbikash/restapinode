const Product = require("../models/productModel");
const asyncHandler = require("../utils/asyncHandler");

const Products = asyncHandler(async (req, res) => {
  const queryObject = {};
  if (req.query.name) {
    queryObject.name = new RegExp(req.query.name, "i");
  }
  if (req.query.company) {
    queryObject.company = new RegExp(req.query.company, "i");
  }
  let apiData = Product.find(queryObject);

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    apiData = apiData.sort(sortBy);
  }
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    apiData = apiData.select(fields);
  }

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 3;
  let skips = (page - 1) * limit;
  apiData = apiData.skip(skips).limit(limit);

  const data = await apiData;
  res.status(200).json({
    status: true,
    message: "All Products",
    products: data,
  });
});

const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(200).json({
    status: true,
    message: "Product create successfully!",
    product,
  });
});

module.exports = { Products, createProduct };
