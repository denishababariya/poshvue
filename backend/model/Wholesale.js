const mongoose = require('mongoose');

const WholesaleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    company: { type: String },
    address: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    state: { type: String, required: true },
    mobile: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: String, required: true },
    details: { type: String },
    status: { type: String, enum: ['new', 'contacted'], default: 'new' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Wholesale', WholesaleSchema);