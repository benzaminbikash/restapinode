const express = require("express");
const router = express.Router();
const { Products, createProduct } = require("../controllers/productcontroller");

router.route("/").get(Products).post(createProduct);

module.exports = router;
