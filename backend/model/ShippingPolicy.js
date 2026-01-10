const mongoose = require('mongoose');

const shippingPolicySchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  infoCards: [{
    icon: String,
    title: String,
    text: String
  }],
  sections: [{
    title: String,
    content: String
  }],
  footerText: String,
  footerButtonText: String,
  footerButtonEmail: String
}, { timestamps: true });

module.exports = mongoose.model('ShippingPolicy', shippingPolicySchema);