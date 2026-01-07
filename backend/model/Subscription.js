const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true },
    source: { type: String, enum: ['frontend', 'admin'], default: 'frontend' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Subscription', SubscriptionSchema);