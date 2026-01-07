const mongoose = require('mongoose');

const ColorSchema = new mongoose.Schema(
  {
    name: { type: String },
    hex: { type: String },
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    sku: { type: String, unique: true, sparse: true },
    description: { type: String },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    discountPercent: { type: Number, default: 0 },
    images: [{ type: String }],
    colors: { type: [ColorSchema], default: [] },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    stock: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    rating: { type: Number, min: 0, max: 5 },
    manufacturer: { type: String },
    fabric: { type: String },
    occasion: { type: String },
    washCare: { type: String },
    productType: { type: String },
    work: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);