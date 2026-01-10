const mongoose = require('mongoose');

const privacyPolicySchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  sections: [{
    title: String,
    content: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('PrivacyPolicy', privacyPolicySchema);