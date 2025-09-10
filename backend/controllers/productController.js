const Product = require("../modals/product");
const APIError = require("../utils/APIError");

module.exports.getAllProducts = async (req, res) => {
  const products = await Product.find();

  res.status(200).json(products);
};

module.exports.createProduct = async (req, res) => {
  const newProduct = new Product(req.body);

  const saved = await newProduct.save();
  res.status(201).json(saved);
};

module.exports.updateProduct = async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  const saved = await Product.findById(req.params.id);
  res.json(saved); // must return saved doc with _id
};

module.exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({ messsage: "Product is Deleted" });
};
