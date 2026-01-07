const mongoose = require('mongoose');

const WholesaleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    company: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String },
    status: { type: String, enum: ['new', 'contacted'], default: 'new' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Wholesale', WholesaleSchema);