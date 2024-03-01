const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  medicineName: {
    type: String,
    required: true,
  },
  medicineDescription: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  medicineImage: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "store_registration_data",
  },
});

module.exports = mongoose.model("PRODUCT", ProductSchema);
