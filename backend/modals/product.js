const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categroy: {
    type: String,
    enum: [
      "ELECTRONICS",
      "FASHION",
      "GROCERY",
      "HOME_APPLIANCES",
      "BEAUTY_AND_HEALTH",
      "SPORTS_AND_OUTDOORS",
      "BOOKS_AND_STATIONERY",
      "TOYS_AND_GAMES",
      "AUTOMOTIVE",
      "FURNITURE",
      "JEWELRY_AND_ACCESSORIES",
      "PET_SUPPLIES",
      "OTHERs",
      ],
    
    required:true
  },
});


const Product = mongoose.model("Product", productSchema);

module.exports = Product;