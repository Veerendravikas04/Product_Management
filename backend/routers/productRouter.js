const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const { getAllProducts, getProductDetails, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const router = express.Router();

router.get("/", wrapAsync(getAllProducts));
router.post("/", wrapAsync(createProduct));
router.put("/:id", wrapAsync(updateProduct));
router.delete("/:id", wrapAsync(deleteProduct));

module.exports = router;